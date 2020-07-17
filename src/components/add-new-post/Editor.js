import React, { forwardRef } from "react";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import withReactContent from "sweetalert2-react-content";
import { object, string } from "yup";
import config from "../../config";
import CustomFileUpload from "../components-overview/CustomFileUpload";
import { Card, CardBody, Form, FormInput, Button, FormFeedback } from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

const MySwal = withReactContent(Swal);

const Editor = forwardRef(({ type, toggleLoader }, ref) => {
  const editorForm = useFormik({
    initialValues: {
      title: "",
      content: "",
      author: "",
      imgSrc: "",
    },
    validationSchema: object({
      title: string().required("Title is required"),
      author: string().required("Author is required"),
      imgSrc: string().required("Please upload a featured image"),
    }),
    onSubmit: (values) => {
      toggleLoader(true);
      const baseAPI = type === "post" ? `${config.API}/blogs` : `${config.API}/sermons`;
      let data = {};

      console.log("Type");
      switch (true) {
        case type === "sermon":
          data = {
            sermon_title: values.title,
            sermon_content: values.content,
            sermon_author: values.author,
            featured_img: values.imgSrc,
          };
          break;
        case type === "post":
          data = {
            blog_title: values.title,
            blog_content: values.content,
            blog_author: values.author,
            featured_img: values.imgSrc,
          };
          break;

        default:
          break;
      }

      fetch(baseAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          toggleLoader(false);
          editorForm.resetForm(editorForm.initialValues);

          MySwal.fire({
            icon: "success",
            title: "Success",
            text:
              type === "sermon"
                ? "Sermon created successfully"
                : "Blog post created successfully",
            timer: 2000,
          });
        })
        .catch((err) => {
          toggleLoader(false);
          console.log("ERRR", err);

          MySwal.fire({
            icon: "error",
            title: "Error",
            text: err,
            timer: 2000,
          });
        });
    },
  });

  const handleFileChange = (e) => {
    const fileReader = new FileReader();

    fileReader.onloadend = (e) => {
      editorForm.setFieldValue("imgSrc", e.target.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handleEditorChange = (value) => {
    editorForm.setFieldValue("content", value);
  };

  return (
    <Card small className='mb-3'>
      <CardBody>
        <Form name='form' className='add-new-post' onSubmit={editorForm.handleSubmit}>
          <FormInput
            id='title'
            size='md'
            className={editorForm.errors.title && editorForm.touched.title ? "" : "mb-3"}
            value={editorForm.values.title}
            placeholder={type === "post" ? "Your Post Title" : "Sermon Title"}
            onChange={editorForm.handleChange}
            onBlur={editorForm.handleBlur}
            invalid={editorForm.errors.title && editorForm.touched.title}
          />
          {editorForm.errors.title && editorForm.touched.title && (
            <FormFeedback className='mb-3'>{editorForm.errors.title}</FormFeedback>
          )}

          <FormInput
            id='author'
            size='md'
            className={
              editorForm.errors.author && editorForm.touched.author ? "" : "mb-3"
            }
            value={editorForm.values.author}
            placeholder='Author e.g Paul Adedokun'
            onChange={editorForm.handleChange}
            invalid={editorForm.errors.author && editorForm.touched.author}
            onBlur={editorForm.handleBlur}
          />
          {editorForm.errors.author && editorForm.touched.author && (
            <FormFeedback className='mb-3'>{editorForm.errors.author}</FormFeedback>
          )}

          <CustomFileUpload
            type='image'
            handleFileChange={handleFileChange}
            handleBlur={editorForm.handleBlur}
            invalid={editorForm.errors.imgSrc && editorForm.touched.imgSrc}
          />
          {console.log(editorForm.errors, editorForm.touched)}

          <ReactQuill
            className='add-new-post__editor mb-1'
            value={editorForm.values.content}
            onChange={handleEditorChange}
            // onBlur={editorForm.handleBlur}
          />
          <Button className='invisible' innerRef={ref} type='submit'>
            Publish
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
});

Editor.propTypes = {
  type: PropTypes.string.isRequired,
  toggleLoader: PropTypes.func.isRequired,
};

export default Editor;
