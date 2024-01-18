import { twMerge } from "tailwind-merge";
import WarningIcon from "./WarningIcon";
import LinkButton from "./LinkButton";
import { BARS_HEIGHT } from "../sharedData";

const textGenericMessage = "Ne pare rǎu, dar pagina nu existǎ :(";
const buttonGenericMessage = "Du-mǎ pe pagina principalǎ";

const Error = ({ className, errorMessage = null, buttonMessage = null, fullHeight = true }) => {
  const textMessage = errorMessage === null ? textGenericMessage : errorMessage;
  const linkButtonMessage = buttonMessage === null ? buttonGenericMessage : buttonMessage;
  const containerHeight = fullHeight ? { minHeight: `calc(100vh - ${BARS_HEIGHT.nav + BARS_HEIGHT.footer}px)` } : {};

  return (
    <div
      style={containerHeight}
      className={twMerge("h-full flex flex-col items-center justify-center gap-8 p-4", className)}
    >
      <div className="flex items-center justify-center flex-wrap gap-2">
        <WarningIcon className="shrink-0" />
        <span className="font-light xs:text-lg text-center text-grey-700">{textMessage}</span>
      </div>

      <LinkButton to="/" disguiseAsFullButton={true} className="p-2">
        {linkButtonMessage}
      </LinkButton>
    </div>
  );
};

export default Error;
