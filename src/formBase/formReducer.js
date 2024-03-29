import * as actions from "./constants";

const addFieldRef = (refs, newRef) => {
  if (refs.find((el) => el.name === newRef.name)) return refs;
  return [...refs, newRef];
};

const validateFieldAtRegister = (name, state) => {
  const input = state.refs.find((el) => el.name === name);
  const rules = state.schema[name];
  const invalidByDefault = { isValid: false, errorMessage: null };
  const validByDefault = { isValid: true, errorMessage: null };
  //error message as 'null' because the form will start with invalid error messages

  if (!rules) return validByDefault;

  if (rules.minLength && input.value.length <= rules.minLength.value - 1) {
    return invalidByDefault;
  } else if (rules.maxLength && input.value.length > rules.maxLength.value) {
    return invalidByDefault;
  } else if (rules.regex && !rules.regex.pattern.test(input.value)) {
    return invalidByDefault;
  } else if (rules.required && input.value.length === 0) {
    return invalidByDefault;
  } else {
    return validByDefault;
  }
};

const formReducer = (state, { action, payload }) => {
  switch (action) {
    case actions.FORM_REGISTER_DATA:
      // this runs after FIELD_REGISTER
      state.refs.forEach((field) => {
        const fieldName = field.name;

        if (field.type === "file") return;
        field.value = state.defaultValues[fieldName] ? state.defaultValues[fieldName] : "";

        const fieldValidation = validateFieldAtRegister(fieldName, state);

        state = {
          ...state,
          fieldsState: {
            ...state.fieldsState,
            [fieldName]: { isValid: fieldValidation.isValid, errorMessage: fieldValidation.errorMessage },
          },
        };
      });

      return { ...state, schema: payload.schema, defaultValues: payload.defaultValues };

    case actions.FIELD_REGISTER:
      return {
        ...state,
        refs: [...addFieldRef(state.refs, payload.ref)],
      };

    case actions.FIELD_SET_INVALID:
      return {
        ...state,
        fieldsState: {
          ...state.fieldsState,
          [payload.name]: { isValid: false, errorMessage: payload.message },
        },
      };

    case actions.FIELD_SET_VALID:
      return {
        ...state,
        fieldsState: {
          ...state.fieldsState,
          [payload.name]: { isValid: true, errorMessage: null },
        },
      };

    default:
      return state;
  }
};

export default formReducer;
