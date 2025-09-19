export type OmitClassName<T> = Omit<T, "className"> & {
  className?: string
}
