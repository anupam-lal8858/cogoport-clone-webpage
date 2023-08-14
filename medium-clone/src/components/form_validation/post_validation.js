import * as Yup from "yup";

export const PostSchema = Yup.object({
        title: Yup.string().min(2).max(60).required("Please enter your title"),
        genre: Yup.string().max(40).required("Please enter the topic"),
        image_url: Yup.string().required("Please fill this field"),
        // postText: Yup.string().required("Please type post"),
        author : Yup.string().min(2).required("Please enter your name")
});