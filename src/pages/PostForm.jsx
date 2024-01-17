import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageSelect from "../formComponents/ImageSelect";
import ValidationInput from "../formComponents/ValidationInput";
import Textarea from "../formComponents/Textarea";
import { Form } from "../formBase/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../formComponents/form";
import ComboBox from "../formComponents/ComboBox";
import Selector from "../formComponents/Selector";
import PageContainer from "../shared/PageContainer";
import { COUNTIES, OBJECT_CATEGORY, POSTTYPE } from "../sharedData";
import { schema, defaultValues } from "../features/postForm/data";
import { handleImageUpload } from "../formBase/formHelpers";
import { filterData, sanitizeInput } from "../utils/helpers";
import { createPost } from "../services/postApi";
import SubmitButton from "../shared/SubmitButton";
import { warningToast } from "../shared/Toasts";

// TODO: disable name and phone and use uid

const formData = {
  schema,
  defaultValues,
};

const errorMessage = "A apǎrut o eroare. Te rugǎm încearcǎ din nou.";

const PostForm = () => {
  const [isPostCreated, setIsPostCreated] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = (values) => {
    const process = async () => {
      const imageUploaderResponse = await handleImageUpload(values.image);

      if (imageUploaderResponse.status !== "ok") return warningToast(errorMessage);

      const sanitizedFormValues = {
        title: sanitizeInput(values.title, true),
        description: sanitizeInput(values.description),
      };

      const newData = { ...values, ...sanitizedFormValues, image: imageUploaderResponse.data };
      const postResponse = await createPost(newData);

      if (postResponse.status !== "ok") return warningToast(errorMessage);
      setIsPostCreated(true);
    };

    process();
  };

  // TODO: create success modal
  // if (isPostCreated) navigate("/");

  return (
    <PageContainer>
      <div className={"max-w-lg mx-auto space-y-8"}>
        <h1 className="text-xl xs:text-3xl font-medium">Ce anume ai gǎsit | pierdut...?</h1>
        <Form {...formData} onSubmit={handleOnSubmit} className="space-y-5 w-full">
          <FormField
            name="title"
            render={(field) => (
              <FormItem>
                <FormLabel>Titlul anunțului</FormLabel>
                <ValidationInput placeholder="ex.: Portofel de piele de culoare negru" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="image"
            render={(field) => (
              <FormItem>
                <FormLabel>
                  Imaginea anunțului<span className="font-light"> (Opțional)</span>
                </FormLabel>
                <ImageSelect {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            render={(field) => (
              <FormItem>
                <FormLabel>Descriere</FormLabel>
                <Textarea placeholder="Adaugǎ o descriere detaliatǎ" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="postType"
            render={(field) => (
              <FormItem>
                {" "}
                <FormLabel>Tipul anunțului</FormLabel>
                <Selector values={POSTTYPE} defaultValue="" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="category"
            render={(field) => (
              <FormItem>
                {" "}
                <FormLabel>Categorie</FormLabel>
                <ComboBox
                  placeholder="Cautǎ dupǎ categorie"
                  defaultValue={defaultValues.category}
                  filter={filterData}
                  data={OBJECT_CATEGORY}
                  render={(item) => <p className="text-left">{item}</p>}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="location"
            render={(field) => (
              <FormItem>
                {" "}
                <FormLabel>Județ | Sector</FormLabel>
                <ComboBox
                  placeholder="Cautǎ dupǎ județ sau sector"
                  defaultValue={defaultValues.county}
                  filter={filterData}
                  data={COUNTIES}
                  render={(item) => <p className="text-left">{item}</p>}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            render={(field) => (
              <FormItem>
                {" "}
                <FormLabel>Nume</FormLabel>
                <ValidationInput placeholder="Numele cu care vei apǎrea în anunț" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            render={(field) => (
              <FormItem>
                {" "}
                <FormLabel>Telefon</FormLabel>
                <ValidationInput placeholder="ex.: 07xxxxxxxx" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full">
            <SubmitButton className="h-12 w-full mt-10">Publicǎ anunțul</SubmitButton>
          </div>
        </Form>
      </div>
    </PageContainer>
  );
};

export default PostForm;
