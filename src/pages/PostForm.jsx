import { useState } from "react";
import PageContainer from "../shared/PageContainer";
import { schema } from "../features/postForm/data";
import Confirmation from "../shared/Confirmation";
import Spinner from "../shared/Spinner";
import { useUserSessionContext } from "../ui/UserSession";
import postFormProcess from "../features/postForm/postFormProcess";
import FormContent from "../features/postForm/FormContent";
import NewPostLegalInfo from "../features/legal/NewPostLegalInfo";
import { handleApiAction } from "../services/apiHelpers/helpers";

const PostForm = () => {
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserSessionContext();

  const defaultValues = user === null ? {} : { name: user.name, phone: user.phone, location: user.location };
  const formData = { schema, defaultValues };

  const handlePostCreate = (values) => {
    handleApiAction(() => postFormProcess(values, setIsLoading, setIsPostCreated));
  };

  if (user === null) return;

  return (
    <PageContainer className={isPostCreated ? "flex items-center justify-center" : ""}>
      {isPostCreated && <Confirmation message="Anunțul tǎu a fost publicat cu succes." />}

      {isPostCreated === false && (
        <div className="max-w-2xl mx-auto space-y-6">
          {isLoading && (
            <Spinner className="fixed z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 backdrop-blur-[4px]" />
          )}
          <h1 className="text-2xl font-medium text-grey-700 leading-none">Publicǎ un anunț nou</h1>
          <div className="space-y-8">
            <NewPostLegalInfo />
            <FormContent formData={formData} handleOnSubmit={handlePostCreate} />
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default PostForm;
