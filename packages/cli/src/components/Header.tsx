import { ReactElement } from "react";
import Image from "next/image";
import cx from "classnames";

import Tooltip from "./Tooltip";
import PreviewSender from "./PreviewSender";

type HeaderProps = {
  title: string;
  previewFunction?: string;
  previewClass?: string;
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
  previous?: string;
  next?: string;
  helpContent: ReactElement;
};

const Header: React.FC<HeaderProps> = ({
  title,
  previewFunction,
  previewClass,
  viewMode,
  setViewMode,
  helpContent,
}) => {
  return (
    <div className="header">
      <div className="path"></div>
      <div className="segmented-control-container">
        <div className="segmented-control">
          <button
            className={cx("desktop", { active: viewMode === "desktop" })}
            onClick={() => setViewMode("desktop")}
          >
            <Image
              src="/icon-desktop.svg"
              width="24"
              height="20"
              alt="Desktop icon"
              title="Toggle desktop view"
            />
          </button>
          <button
            className={cx("mobile", { active: viewMode === "mobile" })}
            onClick={() => setViewMode("mobile")}
          >
            <Image
              src="/icon-mobile.svg"
              width="12.43"
              height="22"
              alt="Mobile icon"
              title="Toggle mobile view"
            />
          </button>
          <button
            className={cx("html", { active: viewMode === "html" })}
            onClick={() => setViewMode("html")}
          >
            <Image
              src="/icon-code.svg"
              width="21"
              height="14.5"
              alt="HTML icon"
              title="Toggle HTML view"
            />
          </button>
        </div>
      </div>
      <div className="buttons-container">
        <Tooltip
          trigger={(show, setShow) => (
            <button
              className="help"
              onClick={() => setShow((current) => !current)}
            >
              {show ? (
                <Image
                  src="/icon-close.svg"
                  width="10"
                  height="10"
                  alt="Close icon"
                  title="Close"
                />
              ) : (
                <Image
                  src="/icon-question.svg"
                  width="8"
                  height="12"
                  alt="Close icon"
                  title="Close"
                />
              )}
            </button>
          )}
          content={helpContent}
        />
        {!process.env.NEXT_PUBLIC_STATIC && previewFunction && previewClass && (
          <Tooltip
            trigger={(show, setShow) => (
              <button
                className="send"
                onClick={() => setShow((current) => !current)}
              >
                {show ? (
                  <Image
                    src="/icon-close.svg"
                    width="10"
                    height="10"
                    alt="Close icon"
                    title="Close"
                  />
                ) : (
                  <Image
                    src="/icon-send.svg"
                    width="14.43"
                    height="14"
                    alt="Send icon"
                    title="Send a preview"
                  />
                )}
              </button>
            )}
            content={
              <PreviewSender
                previewFunction={previewFunction}
                previewClass={previewClass}
              />
            }
          />
        )}
      </div>
      <style jsx>{`
        .header {
          height: 52px;
          border-bottom: 1px dotted #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
        }
        .buttons-container {
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: right;
        }
        .buttons-container,
        .segmented-control-container,
        .path {
          flex: 1;
        }
        .index {
          display: inline-block;
        }
        .segmented-control-container {
          text-align: center;
        }
        .segmented-control {
          display: inline-flex;
          align-items: center;
        }

        button {
          height: 36px;
          border: 1px dotted #333;
          transition: background-color, box-shadow 200ms ease-out;
          text-align: center;
        }
        a {
          transition: background-color, transform 200ms ease-out;
        }
        a:hover span,
        button:hover {
          cursor: pointer;
          background: #e4ebfa;
        }
        button:active {
          box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.5);
        }
        a:active {
          transform: translateY(2px);
        }
        .buttons-container {
          text-align: end;
        }
        .desktop,
        .mobile,
        .html {
          width: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .desktop {
          border-right: none;
          border-top-left-radius: 16px;
          border-bottom-left-radius: 16px;
        }
        .html {
          border-left: none;
          border-top-right-radius: 16px;
          border-bottom-right-radius: 16px;
        }
        .active {
          background: #b8ceff;
        }
        .help,
        .send {
          width: 36px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .help {
          margin: 0 8px 0 0;
        }
        @media (max-width: 768px) {
          .segmented-control-container,
          .help {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
