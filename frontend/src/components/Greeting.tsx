type GreetingProps = {
  name: string
}

export default function Greeting({ name }: GreetingProps) {
  return <h2>Hello, {name}! 👋</h2>
}
