import { useState, useEffect } from "react";
import PageContainer from "../shared/PageContainer";
import Spinner from "../shared/Spinner";
import Error from "../shared/Error";
import { getPostsByUserId } from "../services/postApi";
import { useUserSessionContext } from "../ui/UserSession";
import Content from "../features/postsDashboard/Content";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const UserPostsDashboard = () => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUserSessionContext();

  useEffect(() => {
    setIsLoading(true);

    const process = async () => {
      const response = await getPostsByUserId(user.id);

      // no need to use response.status
      setPosts(response.data);
      setIsLoading(false);
    };

    process();
  }, [user.id]);

  const loadedAndHasData = isLoading === false && posts !== null;

  return (
    <PageContainer className="bg-inherit">
      <div className="w-full max-w-4xl h-full mx-auto text-center space-y-6">
        <div className="flex flex-col items-start justify-center gap-6">
          <h1 className="text-start text-xl xs:text-2xl font-medium">Anunțurile tale</h1>
          <div className="flex items-center justify-center gap-2">
            <InfoCircledIcon className="w-7 h-7 text-orange-600 shrink-0" />
            <h3 className="text-start text-sm xs:text-base text-grey-600 font-light">
              Anunțurile vor fi șterse dupǎ 30 de zile de la crearea lor.
            </h3>
          </div>
        </div>

        {isLoading && <Spinner fullHeight={false} className="pt-6 xs:pt-24" />}

        {isLoading === false && posts === null && (
          <Error fullHeight={false} showButton={false} errorMessage="Ne pare rǎu, dar a apǎrut o problemǎ :(" />
        )}

        {loadedAndHasData && <Content posts={posts} />}
      </div>
    </PageContainer>
  );
};

export default UserPostsDashboard;