import { config } from "@/configs/api"

export const formatImage = ({ id, url }: { id: string; url: string }) => ({
  id,
  url: `${config.upload.publicUrl}${url}`,
})
