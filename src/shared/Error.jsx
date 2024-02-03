import { twMerge } from "tailwind-merge";
import WarningIcon from "./icons/WarningIcon";
import LinkButton from "./LinkButton";
import { BARS_HEIGHT } from "../utils/sharedData";

const textGenericMessage = "Ne pare rǎu, dar pagina nu existǎ :(";
const buttonGenericMessage = "Du-mǎ pe pagina principalǎ";

const Error = ({
  className,
  errorMessage = null,
  buttonMessage = null,
  fullHeight = true,
  showButton = true,
  to = null,
}) => {
  const textMessage = errorMessage === null ? textGenericMessage : errorMessage;
  const linkButtonMessage = buttonMessage === null ? buttonGenericMessage : buttonMessage;
  const containerHeight = fullHeight
    ? { minHeight: `calc(100vh - ${BARS_HEIGHT.nav + BARS_HEIGHT.footer}px)` }
    : { minHeight: "300px" };

  const path = to === null ? "/" : to;

  return (
    <div
      style={containerHeight}
      className={twMerge("h-full flex flex-col items-center justify-center gap-8 p-4 bg-white", className)}
    >
      <div className="flex items-center justify-center flex-wrap gap-2">
        <WarningIcon className="shrink-0" />
        <span className="font-light xs:text-lg text-center text-grey-700">{textMessage}</span>
      </div>

      {showButton && (
        <LinkButton to={path} disguiseAsFullButton={true} className="p-2">
          {linkButtonMessage}
        </LinkButton>
      )}
    </div>
  );
};

export default Error;
