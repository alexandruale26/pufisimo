import supabase from "./supabase";
import { generateResponse } from "./apiHelpers/helpers";
import {
  supabaseExistingEmailResponseMessage,
  supabaseUserExistsError,
  supabaseSamePasswordResponseMessage,
} from "./apiHelpers/supabaseErrorMessages";

import {
  PASSWORD_UPDATED_MESSAGE,
  EMAIL_UPDATED_MESSAGE,
  LOGOUT_SUCCESS_MESSAGE,
} from "./apiHelpers/apiSuccessMessages";
import {
  GENERIC_ERROR_MESSAGE,
  EMAIL_EXISTS_ERROR_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  SAME_PASSWORD_ERROR_MESSAGE,
} from "./apiHelpers/apiErrorMessages";

const signUpUser = async (credentials) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    if (error || data.user === null) throw new Error(error.message);
    return generateResponse("ok", data.user.id);
  } catch (error) {
    const message = error.message === supabaseUserExistsError ? EMAIL_EXISTS_ERROR_MESSAGE : GENERIC_ERROR_MESSAGE;
    return generateResponse(null, null, message);
  }
};

const deleteUserAtSignupError = async (id) => {
  try {
    const { error, status } = await supabase.rpc("delete_user_at_signup_error", { user_id_to_delete: id });

    if (error || status !== 204) throw new Error(error);

    return generateResponse("ok", null);
  } catch (error) {
    return generateResponse(null, null, error.message);
  }
};

const deleteUserAccount = async (id) => {
  try {
    // profiles and images are automatically removed at user deletion
    const { error, status } = await supabase.rpc("delete_user_and_images", { user_id: id });

    if (error || status !== 204) throw new Error(GENERIC_ERROR_MESSAGE);
    return generateResponse("ok", null);
  } catch (error) {
    return generateResponse(null, null, error.message);
  }
};

const loginUser = async (credentials) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error || data.user === null) throw new Error(LOGIN_ERROR_MESSAGE);
    return generateResponse("ok", null);
  } catch (error) {
    return generateResponse(null, null, error.message);
  }
};

const updatePassword = async (newPassword) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      if (error.message === supabaseSamePasswordResponseMessage || error.status === 422) {
        throw new Error(SAME_PASSWORD_ERROR_MESSAGE);
      } else {
        throw new Error(GENERIC_ERROR_MESSAGE);
      }
    }

    return generateResponse("ok", null, PASSWORD_UPDATED_MESSAGE);
  } catch (error) {
    return generateResponse(null, null, error.message);
  }
};

const updateEmail = async (newEmail) => {
  try {
    const { error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      if (error.message === supabaseExistingEmailResponseMessage || error.status === 422) {
        throw new Error(EMAIL_EXISTS_ERROR_MESSAGE);
      } else {
        throw new Error(GENERIC_ERROR_MESSAGE);
      }
    }

    return generateResponse("ok", null, EMAIL_UPDATED_MESSAGE);
  } catch (error) {
    return generateResponse(null, null, error.message);
  }
};

const logoutUser = async (globalSignOut = false) => {
  const scope = globalSignOut ? "global" : "local";

  try {
    const { error } = await supabase.auth.signOut({ scope: scope });

    if (error) throw new Error(GENERIC_ERROR_MESSAGE);
    return generateResponse("ok", null, LOGOUT_SUCCESS_MESSAGE);
  } catch (error) {
    return generateResponse(null, null, error.message);
  }
};

const getCurrentUser = async () => {
  // session and user from local storage then from DB
  const { data: session } = await supabase.auth.getSession();
  if (session.session === null) return generateResponse(null, null);

  const { data, error } = await supabase.auth.getUser();
  if (error || data.user === null) return generateResponse(null, null);

  return generateResponse("ok", { id: data.user.id, email: data.user.email });
};

export {
  signUpUser,
  loginUser,
  deleteUserAtSignupError,
  deleteUserAccount,
  getCurrentUser,
  logoutUser,
  updatePassword,
  updateEmail,
};
