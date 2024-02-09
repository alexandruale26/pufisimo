import { useState } from "react";
import { Form } from "../../formBase/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../../formComponents/form";
import ValidationInput from "../../formComponents/ValidationInput";
import SubmitButton from "../../shared/SubmitButton";
import { schema, lengths } from "../account/createAccountData";
import ConfirmationBox from "../../shared/ConfirmationBox";
import Spinner from "../../shared/Spinner";
import { updatePassword } from "../../services/userApi";
import toastNotification from "../../shared/Toasts";

const PasswordEditForm = () => {
  const [newPassword, setNewPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModal = (e) => {
    e.preventDefault();
    setModalIsOpen(false);
  };

  const handleOnSubmit = (values) => {
    setModalIsOpen(true);
    setNewPassword(values.password);
  };

  const handlePasswordUpdate = () => {
    const process = async () => {
      setModalIsOpen(false);
      setIsLoading(true);

      const response = await updatePassword(newPassword);

      if (response.status !== "ok") {
        toastNotification(response.message);
      } else {
        const passwordInput = document.getElementById("password");

        if (passwordInput) passwordInput.value = "";
        toastNotification(response.message, true);
      }

      setIsLoading(false);
    };

    process();
  };

  const formData = { schema, defaultValues: {} };

  return (
    <Form {...formData} onSubmit={handleOnSubmit} className="w-full">
      <FormField
        name="password"
        render={(field) => (
          <FormItem className="max-w-full">
            <ValidationInput
              type="password"
              placeholder="Introdu o parolǎ sigurǎ"
              {...field}
              maxLength={lengths.password.max}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="w-full pt-6">
        <SubmitButton className="h-12 w-full overflow-hidden bg-grey-800" disabled={isLoading}>
          {isLoading ? <Spinner fullHeight={false} className="w-9 h-9" /> : <span>Salveazǎ parola</span>}
        </SubmitButton>
      </div>

      {modalIsOpen && (
        <ConfirmationBox handleOnDeny={handleModal} handleOnConfirm={handlePasswordUpdate}>
          <div className="h-full min-h-[50px] flex flex-col items-center justify-between gap-8">
            <p className="px-0 text-sm xxs:text-base text-grey-800 text-center">
              Ești sigur cǎ dorești sǎ modifici parola?
            </p>
          </div>
        </ConfirmationBox>
      )}
    </Form>
  );
};

export default PasswordEditForm;
