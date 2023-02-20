import { View } from "react-native"
import { Button, Card, Checkbox, Divider, List, Text, TextInput, useTheme } from "react-native-paper"
import { Converter } from "../converter"
import { WorkoutT } from "../util/interfaces"

interface WorkoutViewI {
  workout: WorkoutT
}
function WorkoutView({workout}: WorkoutViewI) {
  const theme = useTheme()

  const convertWorkout = async (workout: WorkoutT) => {
    const converter = new Converter({csvFilePath: ''}, console.log)
    const activities = Converter.convertToFitActivities([workout])
    await converter.writeActivitiesToFitFiles(activities)
  }
  return (
    <View style={{paddingBottom: 10}} >
      <Card>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox status={workout.meta.selected ? 'checked' : 'unchecked'} />
          <Text>{workout.date.toLocaleDateString('de')}</Text>
          <Button
            mode="contained-tonal"
            style={{marginLeft: 'auto'}}
            onPress={() => convertWorkout(workout)}
          >Convert</Button>
          <Button
            mode="contained-tonal"
            style={{marginLeft: 'auto'}}
          >Upload</Button>
        </View>
        <List.Accordion style={{backgroundColor: theme.colors.backdrop}} title="Workout Details">
          {workout.exercises.map((exercise, i) => (
            <View style={{marginBottom: 10}} key={i}>
              <Divider style={{marginVertical: 10}}/>
              <Text>Exercise</Text>
              <TextInput
                label="Fitnotes Name"
                value={exercise.fitnotesName}
              />
              <TextInput
                label="Garmin Name"
                value={exercise.fitName}
              />
              <Text style={{marginTop: 10}}>Sets</Text>
              {exercise.sets.map((set, j) => (
                <View>
                  <View style={{flexDirection: 'row'}} key={`${i}-${j}`}>
                    <TextInput
                      label="Weight"
                      value={set.weight.toString()}
                      style={{flex: 1}}
                    />
                    <TextInput
                      label="Reps"
                      value={set.weight.toString()}
                      style={{flex: 1}}
                    />
                  </View>
                  <View style={{flexDirection: 'row'}} key={i}>
                    <TextInput
                      label="Time"
                      value={set.time}
                      style={{flex: 1}}
                    />
                    <TextInput
                      label="Rest Time"
                      value={set.restTime}
                      style={{flex: 1}}
                    />
                  </View>
                </View>
              ))}
            </View>
          ))}
        </List.Accordion>
      </Card>
      <Divider/>
    </View>
  )
}

export default WorkoutView