interface IProps {
  text: string
}

const CustomButton = ({ text }: IProps) => {
  return <button>{text}</button>
}

export default CustomButton
