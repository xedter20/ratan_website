import { useState, useRef } from 'react';
import { useLocation } from "react-router-dom";

import InputText from '../../../components/Input/InputText';
import { Formik, useField, useFormik, Form } from 'formik';
import * as Yup from 'yup';

import PageBanner from "../../../components/PageBanner/PageBanner";
import img1 from "../../../assets/images/about/about-1.jpg";
import img2 from "../../../assets/images/about/about-2.jpg";
import img3 from "../../../assets/images/about/about-3.jpg";

const About = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  const formikConfig = {
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Required field'),
      password: Yup.string()
        .min(8, 'Minimun of 8 character(s)')
        .required('Required field')
    }),
    onSubmit: async (
      values,
      { setSubmitting, setFieldValue, setErrorMessage, setErrors }
    ) => {

    }
  };


  return (
    <section>
      <PageBanner pathname={pathname} />
      <div className="flex items-center justify-center mb-8 mt-4">
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn bg-green-500 text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>Join Us Today</button>
        <dialog id="my_modal_3" className="modal">

          <Formik {...formikConfig}>
            {({
              handleSubmit,
              handleChange,
              handleBlur, // handler for onBlur event of form elements
              values,
              touched,
              errors
            }) => {

              return <div className="modal-box w-full max-w-4xl">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg text-yellow-700">Member Registration</h3>

                <Form className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 ">

                    <InputText
                      // icons={mdiAccount}
                      label="First name"
                      labelColor="text-white"
                      name="email"
                      type="text"
                      placeholder=""
                      value={values.email}
                      onBlur={handleBlur} // This apparently updates `touched`?
                    />
                    <InputText
                      // icons={mdiAccount}
                      label="Last name"
                      labelColor="text-white"
                      name="email"
                      type="text"
                      placeholder=""
                      value={values.email}
                      onBlur={handleBlur} // This apparently updates `touched`?
                    />


                  </div>
                  <div className="modal-action mt-12">
                    <button
                      type="submit"
                      className={
                        'btn mt-2 bg-yellow-500 text-white font-bold' +
                        (loading ? ' loading' : '')
                      }>
                      Submit
                    </button>
                  </div>
                </Form>

              </div>

            }}
          </Formik>

        </dialog>

      </div>
      <div className="px-[4%] pb-32 md:px-[7%]">
        {/* Our values section */}
        <div className="mb-40 justify-between pt-10 md:flex md:pt-20">
          {/* our values images */}
          <div className="mb-10 flex min-h-80 w-full justify-center md:mb-0 md:w-1/2">
            <div className="relative w-full">

              <div className="video-container">
                <video width="550" controls>
                  <source src="https://firebasestorage.googleapis.com/v0/b/ratan-eccomerce.appspot.com/o/How_to_make_Rattan_Basket_tutorial.mp4?alt=media&token=aa6f7260-3e69-49f9-b275-8264c2bc58d2" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* <img
                className="absolute left-0 top-0 h-60 w-52 rounded-md object-cover object-center shadow-lg md:w-56 lg:h-80 lg:w-72 xl:h-96 xl:w-80"
                src={img2}
                alt="urbanAura board room"
                loading="lazy"
              />
              <img
                className="absolute left-[80px] top-[65px] h-60 w-52 rounded-md object-cover object-center shadow-lg md:w-56 lg:h-80 lg:w-72 xl:left-[30%] xl:top-[25%] xl:h-96 xl:w-80"
                src={img1}
                alt="urbanAura employee"
                loading="lazy"
              /> */}
            </div>
          </div>
          {/* our values details */}

          <div className="w-full md:w-1/2">
            <h2 className="mb-4 uppercase tracking-widest text-gray-400">
              Our Values
            </h2>
            <h1 className="mb-4 font-Montserrat text-[26px] font-bold md:text-3xl lg:text-4xl">
              Meet Alanao Handicrafts Association
              <br className="" />
              {/* <span className="block">stylish.</span>
              <span className="block">quality.</span>
              <span className="block">comfortable.</span>
              <span className="block">sustainable.</span> */}
            </h1>
            <p className="mt-6 max-w-md text-gray-400 lg:text-lg">
              To enable customers to order custom-made products and allow them to make customizations on their desired products (such as uploading photo of desired-design and selecting an available desired-design.
            </p>
          </div>
        </div>

        {/* Our mission section */}
        <div className="justify-between gap-4 md:flex lg:pt-0">
          {/* our mission list */}
          <div className="w-full md:w-1/2">
            <h2 className="mb-4 uppercase tracking-widest text-gray-400">
              Our mission
            </h2>
            <h1 className="mb-4 max-w-md font-Montserrat text-[26px] font-bold md:text-3xl lg:text-4xl">
              Transforming spaces, enriching lives with quality handicrafts.
            </h1>
            <p className="mt-6 max-w-md text-gray-400">
              To provide customers with multiple convenient payment methods such as online payment via Maya and Gcash, cash on delivery and cash-on-pickup.
            </p>
            <ul className="mt-6 space-y-4">
              <li>
                <h3 className="mb-1 text-xl font-medium">Quality</h3>
                <p className="text-sm">
                  We use the finest materials to create handicrafts that lasts.
                </p>
              </li>
              <li>
                <h3 className="mb-1 text-xl font-medium">Sustainability</h3>
                <p className="text-sm">Committed to eco-friendly practices.</p>
              </li>
              <li>
                <h3 className="mb-1 text-xl font-medium">Satisfaction</h3>
                <p className="text-sm">Your happiness is our priority.</p>
              </li>
            </ul>
          </div>
          {/* our mission delivery guy img */}
          <div className="mt-10 w-full md:mt-0 md:w-1/2">

            <div className="video-container">
              <video width="550" controls>
                <source src="https://firebasestorage.googleapis.com/v0/b/ratan-eccomerce.appspot.com/o/basic%20tutorial%20of%20weaving%20rattan.mp4?alt=media&token=cd62d072-57e7-4c51-b9e6-ac85a48bc7b9" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            {/* <img
              className="w-[340px] rounded-md"
              src={img3}
              alt="urbanAura delivery"
              loading="lazy"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
