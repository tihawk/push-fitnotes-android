import * as React from 'react';
import { Card, Checkbox, List } from 'react-native-paper';
import { View } from 'react-native';

function MyComponent() {
  const [expanded, setExpanded] = React.useState(true);
  const [checked, setChecked] = React.useState<'checked' | 'unchecked'>('unchecked')
  
  const handlePress = (e: any) => {
    setChecked(val => val === 'checked' ? 'unchecked' : 'checked')
    setExpanded(!expanded)
  };
  
  return (
    <>
      <Card>
        <Card.Actions>
          <WokroutTitle checked={checked}/>
        </Card.Actions>
        {/* <Card.Content> */}
          <List.Accordion
            title={<WokroutTitle checked={checked}/>}
            left={() => <WokroutTitle checked={checked}/>}
            expanded={expanded}
            onPress={e => handlePress(e)}
          >
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
        {/* </Card.Content> */}
      </Card>

      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </>
  );
};

function WokroutTitle({checked}: {checked: 'checked' | 'unchecked'}) {
  return (
    <View>
      <Checkbox status={checked}/>
    </View>
  )
}

export default MyComponent;