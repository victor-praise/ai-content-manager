import Form from "next/form";

function YouTubeVideoForm() {
  return (
    <div>
        <Form action={()=>{}} className="flex flex-col sm:flex-row gap-2 itmes-center">
        <input name="url" type="text" placeholder="Enter YouTube video URL" />
        </Form>
    </div>
  )
}

export default YouTubeVideoForm