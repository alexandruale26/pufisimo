import ImageSelect from "../formComponents/ImageSelect";
import ValidationInput from "../formComponents/ValidationInput";
import Textarea from "../formComponents/Textarea";
import { Form } from "../formBase/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../formComponents/form";
import ComboBox from "../formComponents/ComboBox";
import Selector from "../formComponents/Selector";
import { COUNTIES, OBJECT_CATEGORY } from "../sharedData";
import { removeDiacritics } from "../utils/helpers";
import { createPost, uploadImage } from "../services/postApi";

const schema = {
  title: {
    minLength: {
      value: 10,
      errorMessage: "Titlul trebuie sa aiba minim 10 caractere",
    },
    maxLength: {
      value: 60,
      errorMessage: "Titlul trebuie sa aiba maxim 60 caractere",
    },
  },
  name: {
    minLength: {
      value: 3,
      errorMessage: "Numele trebuie sa aiba minim 3 caractere",
    },
    maxLength: {
      value: 25,
      errorMessage: "Numele trebuie sa aiba maxim 25 caractere",
    },
  },
  location: {
    required: {
      errorMessage: "Alege o locație",
    },
  },
  category: {
    required: {
      errorMessage: "Alege o categorie",
    },
  },
  description: {
    minLength: {
      value: 20,
      errorMessage: "Descrierea trebuie sa aiba minim 20 caractere",
    },
    maxLength: {
      value: 300,
      errorMessage: "Descrierea trebuie sa aiba maxim 300 caractere",
    },
  },
  phone: {
    regex: {
      pattern: /^07\d{8}$/,
      errorMessage: "Numarul nu este valid",
    },
  },
};

const defaultValues = {
  title: "",
  name: "Alexa",
  phone: "",
  category: "",
  location: "",
  postType: "lost",
};

const formData = {
  schema,
  defaultValues,
};

const postType = [
  ["lost", "Pierdute"],
  ["found", "Gǎsite"],
];

const filterData = (data, search) => {
  return data.filter((value) => {
    const noDiacriticsSearch = removeDiacritics(value);
    const noDiacriticsTarget = removeDiacritics(search);
    return noDiacriticsSearch.toLowerCase().includes(noDiacriticsTarget.toLowerCase());
  });
};

const PostForm = () => {
  const onSubmit = (values) => {
    const processPost = async () => {
      const image = await uploadImage(values.image); // handle no image

      const newData = { ...values, image: image };
      await createPost(newData);
    };

    // processPost();
    console.log(values);
  };

  return (
    <Form {...formData} onSubmit={onSubmit}>
      <FormField
        name="title"
        render={(field) => (
          <FormItem className="max-w-lg">
            <FormLabel>Titlu</FormLabel>
            <ValidationInput placeholder="ex.: Pierdut cheie autoturism" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="image"
        render={(field) => (
          <FormItem className="max-w-lg">
            <FormLabel>Imaginea anunțului</FormLabel>
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
          <FormItem>
            <FormLabel>Tipul anunțului</FormLabel>
            <Selector values={postType} defaultValue={defaultValues.postType} {...field} />
          </FormItem>
        )}
      />

      <FormField
        name="category"
        render={(field) => (
          <FormItem>
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
            <FormLabel>Nume</FormLabel>
            <ValidationInput placeholder="Numele cu care vei apǎrea în anunț" disabled {...field} />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="phone"
        render={(field) => (
          <FormItem>
            <FormLabel>Telefon</FormLabel>
            <ValidationInput placeholder="ex.: 07xxxxxxxx" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />

      <button
        className="bg-black p-4 rounded-md text-white hover:text-emerald-300 focus-visible:outline-none"
        type="submit"
      >
        Publicǎ anunțul
      </button>
    </Form>
  );
};

export default PostForm;
