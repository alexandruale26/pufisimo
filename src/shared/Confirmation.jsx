import { twMerge } from "tailwind-merge";
import LinkButton from "./LinkButton";

const Confirmation = ({ className, message, buttonTitle = null }) => {
  const buttonText = buttonTitle ? buttonTitle : "Am înțeles";

  return (
    <div className={twMerge("w-full h-full flex flex-col items-center justify-center gap-8", className)}>
      <h3 className="text-xl xs:text-2xl text-grey-800  text-center">{message}</h3>

      <LinkButton to="/" replace={true} disguiseAsFullButton={true}>
        {buttonText}
      </LinkButton>
    </div>
  );
};

export default Confirmation;