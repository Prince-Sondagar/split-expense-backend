import { v2 as cloudinary, ImageTransformationOptions } from 'cloudinary';



// configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});


export const cloudinaryImageUpload = async (file: string) => {
    const uploadOption: ImageTransformationOptions = {
        resource_type: "image",
        quality: "auto",
        fetch_format: "auto"
    };

    try {
        const uploadResult = await cloudinary.uploader.upload(file, uploadOption);
        return uploadResult.secure_url;
    } catch (error) {
        console.log("Error in cloudinaryImageUpload:", error);
        return error;
    }
};


export const cloudinaryImageRemove = async (imageUrl: string) => {
    try {

        if (!imageUrl) {
            throw new Error("Invalid image URL");
        }
        const publicId = imageUrl.split('/')?.pop()?.split('.')[0];

        const result = await cloudinary.uploader.destroy(publicId as string, {
            resource_type: "image",
        });

        console.log("Cloudinary deletion result:", result);
        return result;
    } catch (error: any) {
        console.log("Error in cloudinaryImageRemove:", error);
        return { error: error.message || "Failed to delete image" };;
    }
};