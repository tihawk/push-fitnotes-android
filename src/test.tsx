import { Button, Card, Text, useTheme } from "react-native-paper"

function Element() {
  const theme = useTheme()
  return (
    <Card>
      <Card.Title title={<><Button>hello</Button></>} />
      <Card.Content>
        <Text variant="bodyLarge">
          this is a test
          this is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a test
        </Text>
      </Card.Content>
    </Card>
  )
}

export default Element