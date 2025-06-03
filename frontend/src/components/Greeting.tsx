type GreetingProps = {
  name: string
  message: string
}

export default function Greeting({ name, message }: GreetingProps) {
  return (
  <div>
    <h2>Hello, {name}! 👋</h2>
    <p>{message}</p>
  </div>
  )
}
