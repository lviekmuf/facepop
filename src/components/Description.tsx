
interface Props {
  title?: string
  description?: string
}

const Description = (props: Props) => {
const {title, description} = props
  return (
    <div>
     <div className="text-white text-4xl mb-2">{title}</div>
     <div className="text-white text-sm">{description}</div>
    </div>
  );
}

export default Description;
