"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  HiMiniSparkles,
  HiOutlineChatBubbleLeftRight,
  HiOutlineMinus,
  HiOutlinePaperAirplane,
  HiOutlineXMark,
} from "react-icons/hi2";
import styles from "./ArunGPT.module.css";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi, I'm ArunGPT.\nAsk me about Arun's skills, projects, experience, resume, or hiring.",
};

const URL_PATTERN = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;

function sanitizeAssistantText(content: string) {
  return content
    .replace(/\r/g, "")
    .replace(/â€¢/g, "•")
    .replace(/â/g, "'")
    .replace(/â/g, "-")
    .replace(/â/g, "-")
    .replace(/\*\*/g, "")
    .replace(/#{1,6}\s*/g, "")
    .replace(/```/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1: $2")
    .replace(/^\s*--+\s*/gm, "")
    .replace(/^\s*-\s+/gm, "• ")
    .replace(/^\s*\*\s+/gm, "• ")
    .replace(/^\s*\d+\.\s+/gm, "• ")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function getNormalizedUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;
}

function renderInlineContent(text: string, keyPrefix: string) {
  const matches = Array.from(text.matchAll(URL_PATTERN));

  if (!matches.length) {
    return text;
  }

  const parts: ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match, index) => {
    const url = match[0];
    const start = match.index ?? 0;

    if (start > lastIndex) {
      parts.push(
        <span key={`${keyPrefix}-text-${index}`}>
          {text.slice(lastIndex, start)}
        </span>
      );
    }

    parts.push(
      <a
        key={`${keyPrefix}-link-${index}`}
        href={getNormalizedUrl(url)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.inlineLink}
      >
        {url}
      </a>
    );

    lastIndex = start + url.length;
  });

  if (lastIndex < text.length) {
    parts.push(
      <span key={`${keyPrefix}-tail`}>{text.slice(lastIndex)}</span>
    );
  }

  return parts;
}

function renderFormattedContent(content: string) {
  const lines = content.split("\n");

  return lines.map((line, index) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      return <div key={`space-${index}`} className={styles.lineSpacer} />;
    }

    const isBullet = trimmedLine.startsWith("• ");
    const isSectionHeading =
      !isBullet &&
      !trimmedLine.includes(":") &&
      trimmedLine.length <= 48 &&
      /^[A-Za-z][A-Za-z\s/&-]+$/.test(trimmedLine);

    const inlineContent = renderInlineContent(trimmedLine, `line-${index}`);

    if (isSectionHeading) {
      return (
        <p key={`heading-${index}`} className={styles.sectionHeading}>
          {trimmedLine}
        </p>
      );
    }

    if (isBullet) {
      return (
        <div key={`bullet-${index}`} className={styles.bulletRow}>
          <span className={styles.bulletDot} />
          <p className={styles.messageParagraph}>
            {renderInlineContent(trimmedLine.slice(2), `bullet-${index}`)}
          </p>
        </div>
      );
    }

    return (
      <p key={`line-${index}`} className={styles.messageParagraph}>
        {inlineContent}
      </p>
    );
  });
}

function AssistantMessage({ content }: { content: string }) {
  const sanitizedContent = sanitizeAssistantText(content);

  return (
    <div className={styles.formattedMessage}>
      {renderFormattedContent(sanitizedContent)}
    </div>
  );
}

export default function ArunGPT() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLauncherSettled, setIsLauncherSettled] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const apiHistory = useMemo(
    () =>
      messages
        .filter((message) => message.id !== WELCOME_MESSAGE.id)
        .map(({ role, content }) => ({ role, content })),
    [messages]
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isSending, isOpen]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsLauncherSettled(true);
    }, 1400);

    return () => window.clearTimeout(timeout);
  }, []);

  async function sendMessage() {
    const trimmedInput = input.trim();

    if (!trimmedInput || isSending) {
      return;
    }

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: "user",
      content: trimmedInput,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/arun-gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedInput,
          history: apiHistory,
        }),
      });

      const payload = (await response.json()) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !payload.reply) {
        throw new Error(payload.error || "Unable to get a reply right now.");
      }

      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          content: payload.reply as string,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-error`,
          role: "assistant",
          content:
            "I can answer questions about Arun Kumar, but I couldn't reach the assistant service right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className={styles.root}>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={styles.panel}
            aria-label="ArunGPT chat"
          >
            <header className={styles.header}>
              <div className={styles.headerIdentity}>
                <div className={styles.headerIcon}>
                  <HiMiniSparkles size={15} />
                </div>
                <div className={styles.headerCopy}>
                  <div className={styles.headerTitleRow}>
                    <p className={styles.headerTitle}>ArunGPT</p>
                    <span className={styles.onlineDot} />
                  </div>
                  <p className={styles.headerSubtitle}>Portfolio Assistant</p>
                </div>
              </div>

              <div className={styles.headerActions}>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={styles.headerButton}
                  aria-label="Minimize ArunGPT"
                >
                  <HiOutlineMinus size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={styles.headerButton}
                  aria-label="Close ArunGPT"
                >
                  <HiOutlineXMark size={16} />
                </button>
              </div>
            </header>

            <div ref={viewportRef} className={styles.messagesViewport}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: index === 0 ? 0 : 0.03 }}
                  className={`${styles.messageRow} ${
                    message.role === "user"
                      ? styles.messageRowUser
                      : styles.messageRowAssistant
                  }`}
                >
                  <div
                    className={`${styles.messageBubble} ${
                      message.role === "user"
                        ? styles.userBubble
                        : styles.assistantBubble
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <AssistantMessage content={message.content} />
                    ) : (
                      <p className={styles.userMessageText}>{message.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {isSending && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${styles.messageRow} ${styles.messageRowAssistant}`}
                >
                  <div
                    className={`${styles.messageBubble} ${styles.assistantBubble} ${styles.typingBubble}`}
                  >
                    <div className={styles.typingDots} aria-label="ArunGPT is typing">
                      <span className={styles.typingDot} />
                      <span className={styles.typingDot} />
                      <span className={styles.typingDot} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className={styles.inputDock}>
              <form onSubmit={handleSubmit} className={styles.inputShell}>
                <label htmlFor="arun-gpt-input" className={styles.srOnly}>
                  Ask ArunGPT about Arun Kumar
                </label>
                <textarea
                  id="arun-gpt-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Arun's skills or projects..."
                  rows={1}
                  className={styles.textarea}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isSending}
                  className={styles.sendButton}
                  aria-label="Send message"
                >
                  <HiOutlinePaperAirplane size={16} />
                </button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        initial={isLauncherSettled ? false : { scale: 0.92, opacity: 0 }}
        animate={
          isLauncherSettled
            ? { scale: 1, opacity: 1 }
            : { scale: [0.92, 1.06, 1], opacity: 1 }
        }
        transition={{
          duration: isLauncherSettled ? 0.2 : 0.72,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={styles.launcher}
        aria-label={isOpen ? "Close ArunGPT" : "Open ArunGPT"}
      >
        <HiOutlineChatBubbleLeftRight size={24} />
        <span className={styles.launcherTooltip}>ArunGPT</span>
      </motion.button>
    </div>
  );
}
