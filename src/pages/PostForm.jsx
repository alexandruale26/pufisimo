import ImageSelect from "../formComponents/ImageSelect";
import ValidationInput from "../formComponents/ValidationInput";
import Textarea from "../formComponents/Textarea";
import { Form } from "../formBase/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../formComponents/form";
import ComboBox from "../formComponents/ComboBox";
import Selector from "../formComponents/Selector";
import { COUNTIES, OBJECT_CATEGORY, POSTTYPE } from "../sharedData";
import { schema, defaultValues } from "../features/postForm/data";
import { convertImage } from "../formBase/formHelpers";
import { filterData, sanitizeInput } from "../utils/helpers";
import { createPost, uploadImage } from "../services/postApi";
import SubmitButton from "../shared/SubmitButton";

// TODO: disable name and phone and use uid

const formData = {
  schema,
  defaultValues,
};

const PostForm = () => {
  const handleOnSubmit = (values) => {
    const process = async () => {
      const convertedImg = await convertImage(values.image, 600, 600);
      const imageName = await uploadImage(convertedImg); //TODO: handle no image

      const formInputsUppercased = {
        title: sanitizeInput(values.title, true),
        description: sanitizeInput(values.description),
      };

      const newData = { ...values, ...formInputsUppercased, image: imageName };
      console.log("curated form data", newData);
      await createPost(newData);
    };

    // process();
    console.log(values);
  };

  // TODO: modify new design - all paddings

  return (
    <div className="w-full max-w-2xl mx-auto space-y-0">
      <h1 className="text-xl xs:text-2xl font-medium pl-7">Ce anume ai gǎsit | pierdut...?</h1>
      <Form {...formData} onSubmit={handleOnSubmit} className="space-y-5 w-full bg-white p-4 sm:p-8 rounded-md ">
        <FormField
          name="title"
          render={(field) => (
            <FormItem className="max-w-lg">
              <FormLabel>Titlu</FormLabel>
              <ValidationInput placeholder="ex.: Portofel de piele de culoare negru" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="image"
          render={(field) => (
            <FormItem className="max-w-lg">
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
            <FormItem className="max-w-lg">
              <FormLabel>Descriere</FormLabel>
              <Textarea placeholder="Adaugǎ o descriere detaliatǎ" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="postType"
          render={(field) => (
            <FormItem className="max-w-lg">
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
            <FormItem className="max-w-lg">
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
            <FormItem className="max-w-lg">
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
            <FormItem className="max-w-lg">
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
            <FormItem className="max-w-lg">
              {" "}
              <FormLabel>Telefon</FormLabel>
              <ValidationInput placeholder="ex.: 07xxxxxxxx" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full max-w-lg">
          <SubmitButton className="h-14 w-full mt-10">Publicǎ anunțul</SubmitButton>
        </div>
      </Form>
    </div>
  );
};

export default PostForm;
