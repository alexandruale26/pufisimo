import ImageSelect from "../components/ImageSelect";
import ValidationInput from "../components/ValidationInput";
import Textarea from "../components/Textarea";
import { Form } from "../reactForm/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../components/form";
import ComboBox from "../components/ComboBox";
import { COUNTIES, OBJECT_CATEGORY } from "../reactForm/constants";
import { removeDiacritics } from "../utils/helpers";
import { uploadImage } from "../services/postImageApi";
import createPost from "../services/postApi";

const schema = {
  title: {
    minLength: {
      value: 15,
      errorMessage: "Titlul trebuie sa aiba minim 15 caractere",
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
      pattern: /^\d{10}$/,
      errorMessage: "Numarul nu este valid",
    },
  },
};

const defaultValues = {
  title: "",
  name: "Alexa",
  phone: "",
};

const formData = {
  schema,
  defaultValues,
};

const filterData = (data, search) => {
  return data.filter((value) => {
    const noDiacriticsSearch = removeDiacritics(value);
    const noDiacriticsTarget = removeDiacritics(search);
    return noDiacriticsSearch.toLowerCase().includes(noDiacriticsTarget.toLowerCase());
  });
};

const FormNew = () => {
  const onSubmit = (values) => {
    const process = async () => {
      const image = await uploadImage(values.image); // handle no image

      const newData = { ...values, image: image };
      await createPost(newData);
    };

    process();
  };

  return (
    <Form {...formData} onSubmit={onSubmit}>
      <FormField
        name="title"
        render={(field) => (
          <FormItem>
            <FormLabel>Titlu</FormLabel>
            <ValidationInput placeholder="ex: Pierdut cheie autoturism" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="image"
        render={(field) => (
          <FormItem>
            <FormLabel>Imaginea anunțului</FormLabel>
            <ImageSelect {...field} />
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
        name="category"
        render={(field) => (
          <FormItem>
            <FormLabel>Categorie</FormLabel>
            <ComboBox
              placeholder="Cautǎ dupa categorie"
              defaultValue={defaultValues.county}
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
              placeholder="Cautǎ dupa județ sau sector"
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
            <ValidationInput placeholder="Numele cu care vei apǎrea în anunț" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="phone"
        render={(field) => (
          <FormItem>
            <FormLabel>Telefon</FormLabel>
            <ValidationInput placeholder="Introdu numǎrul tau" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />

      <button className="bg-teal-500 p-4 rounded-xl text-white hover:bg-teal-600" type="submit">
        Publicǎ anunțul
      </button>
    </Form>
  );
};

export default FormNew;
