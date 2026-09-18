"use client";

import { useEffect, useRef, useState } from "react";

export default function FEAA1Page() {
  const [status, setStatus] = useState("idle");
  const [shake, setShake] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const runAction = (result = "success") => {
    // Prevent spam-clicking while an action is already running
    if (status === "loading") {
      return;
    }

    setStatus("loading");
    setShake(false);

    timerRef.current = setTimeout(() => {
      if (result === "error") {
        setStatus("error");
        setShake(true);

        setTimeout(() => {
          setShake(false);
        }, 400);
      } else {
        setStatus("success");

        timerRef.current = setTimeout(() => {
          setStatus("idle");
        }, 1200);
      }
    }, 1200);
  };

  const getButtonContent = () => {
    if (status === "loading") {
      return (
        <>
          <span className="spinner" aria-hidden="true"></span>
          Sending...
        </>
      );
    }

    if (status === "success") {
      return (
        <>
          <span aria-hidden="true">✓</span>
          Sent
        </>
      );
    }

    if (status === "error") {
      return (
        <>
          <span aria-hidden="true">↻</span>
          Retry
        </>
      );
    }

    return (
      <>
        <span aria-hidden="true">➤</span>
        Send
      </>
    );
  };

  const handleMainButton = () => {
    if (status === "error") {
      runAction("success");
      return;
    }

    runAction("success");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900">
      <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
        <section className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Header */}
          <div className="text-center">
            <div className="text-4xl">🧠</div>

            <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
              Buttons with a Brain
            </h1>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-600">
              A state-aware button that communicates what is happening through
              motion and feedback.
            </p>
          </div>

          {/* Demo */}
          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
              Interactive Demo
            </p>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleMainButton}
                disabled={status === "loading"}
                aria-label={
                  status === "error"
                    ? "Retry sending message"
                    : "Send message"
                }
                className={`
                  motion-button
                  ${shake ? "error-shake" : ""}
                  inline-flex min-w-[150px] items-center justify-center gap-2
                  rounded-xl px-6 py-3
                  text-sm font-semibold text-white
                  shadow-sm
                  transition-all duration-300 ease-out
                  hover:-translate-y-0.5 hover:shadow-md
                  focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                  active:translate-y-0
                  disabled:cursor-not-allowed disabled:opacity-60
                  motion-reduce:transition-none
                  ${
                    status === "success"
                      ? "bg-green-600 hover:bg-green-700"
                      : status === "error"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-black hover:bg-gray-800"
                  }
                `}
              >
                {getButtonContent()}
              </button>
            </div>

            {/* Status text */}
            <p
              className="mt-4 text-center text-sm text-gray-600"
              aria-live="polite"
            >
              {status === "idle" && "Ready to send"}
              {status === "loading" && "Your message is being processed..."}
              {status === "success" && "Message sent successfully!"}
              {status === "error" && "Something went wrong. Try again."}
            </p>
          </div>

          {/* Force controls */}
          <div className="mt-6">
            <p className="mb-3 text-center text-sm font-medium text-gray-700">
              Test states manually
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => runAction("success")}
                disabled={status === "loading"}
                className="
                  rounded-lg border border-gray-300 bg-white px-4 py-2.5
                  text-sm font-medium text-gray-800
                  transition-all duration-200 ease-out
                  hover:-translate-y-0.5 hover:bg-gray-100
                  focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                  active:translate-y-0
                  disabled:cursor-not-allowed disabled:opacity-50
                  motion-reduce:transition-none
                "
              >
                Force Success
              </button>

              <button
                type="button"
                onClick={() => runAction("error")}
                disabled={status === "loading"}
                className="
                  rounded-lg border border-red-200 bg-red-50 px-4 py-2.5
                  text-sm font-medium text-red-700
                  transition-all duration-200 ease-out
                  hover:-translate-y-0.5 hover:bg-red-100
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                  active:translate-y-0
                  disabled:cursor-not-allowed disabled:opacity-50
                  motion-reduce:transition-none
                "
              >
                Force Error
              </button>
            </div>
          </div>

          {/* State list */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-sm font-semibold text-gray-900">
              Button states
            </h2>

            <div className="mt-3 grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
              <div>• Idle — Send</div>
              <div>• Hover / Focus — visual feedback</div>
              <div>• Loading — spinner + Sending...</div>
              <div>• Success — ✓ Sent</div>
              <div>• Error — ↻ Retry + shake</div>
              <div>• Disabled — reduced opacity</div>
            </div>
          </div>

          {/* Motion note */}
          <div className="mt-6 rounded-lg bg-gray-100 p-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Motion notes
            </h2>

            <p className="mt-1 text-xs leading-5 text-gray-600">
              Transitions use short 200–300ms ease-out animations so state
              changes feel responsive without being abrupt. The button mainly
              animates transform and opacity for smooth compositor-friendly
              motion. Reduced-motion preferences minimize animation while
              preserving clear state feedback.
            </p>
          </div>
        </section>
      </div>

      {/* Small custom animations */}
      <style jsx>{`
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-top-color: white;
          border-radius: 50%;
          display: inline-block;
          animation: spin 0.7s linear infinite;
        }

        .error-shake {
          animation: shake 0.35s ease-in-out;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }

          25% {
            transform: translateX(-5px);
          }

          50% {
            transform: translateX(5px);
          }

          75% {
            transform: translateX(-3px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .spinner {
            animation: none;
          }

          .error-shake {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}