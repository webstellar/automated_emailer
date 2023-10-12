"use client";
import React, { useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import { sendShareForm } from "@/utils/api";
import { verifyCaptchaAction } from "@/utils/verify";

import { useReCaptcha } from "next-recaptcha-v3";
import { ImSpinner2 } from "react-icons/im";

type valueProps = {
  [key: string]: string;
};

const initState: valueProps = {
  firstname: "",
  lastname: "",
  email: "",
  link: "",
};

const Form: React.FC = () => {
  const [state, setState] = useState(initState);
  const [loading, setLoading] = useState(false);

  const { executeRecaptcha } = useReCaptcha();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) =>
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      //console.log(JSON.stringify(state));

      setLoading(true);
      const token = await executeRecaptcha("contactform_submit");
      //console.log(token);
      const verified = await verifyCaptchaAction(token);

      if (verified) {
        try {
          await sendShareForm(state);
          toast("Link was shared successfully", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
          });
          setLoading(false);
          setState(initState);
        } catch (error) {
          setState((prev) => ({
            ...prev,
          }));
        }
      }
    },
    [executeRecaptcha, state]
  );

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Share WeBe EAG Link
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          To proceed with sharing WeBe EAG links with friends, acquaintances
          please fill the 1-minute form below
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                required
                type="text"
                name="firstname"
                id="firstname"
                autoComplete="given-name"
                value={state.firstname}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-webe-orange-100 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                required
                type="text"
                name="lastname"
                id="lastname"
                autoComplete="family-name"
                value={state.lastname}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-webe-orange-100  sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                required
                type="email"
                name="email"
                id="email"
                value={state.email}
                onChange={handleChange}
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-webe-orange-100  sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="link"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              EAG Share Link
            </label>
            <div className="mt-2.5">
              <input
                required
                type="text"
                name="link"
                id="link"
                autoComplete="organization"
                value={state.link}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-webe-orange-100 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-webe-orange-100 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-webe-orange-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-webe-orange-100"
          >
            {loading ? (
              <>
                <div>
                  <ImSpinner2 className="animate-spin" />
                </div>
                <div className="mr-3">Sharing..</div>
              </>
            ) : (
              <span>Share</span>
            )}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Form;
