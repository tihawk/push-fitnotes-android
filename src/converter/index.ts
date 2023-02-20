import path from 'path'
import fs from 'react-native-fs'
import { getDataExportSettings } from '../settings'
import {
  CSV_DIR,
  EXERCISE_TO_FIT_CATEGORY_MAP,
  OUTFIT_DIR,
} from '../util/constants'
import { ActivityT, ConverterConfigI, WorkoutT } from '../util/interfaces'
import ActivityEncoder from './ActivityEncoder'

export class Converter {
  config: ConverterConfigI = {
    csvFilePath: '',
    csvDir: CSV_DIR,
    outFitDir: OUTFIT_DIR,
  }
  logger

  constructor(config: ConverterConfigI, logger: any) {
    this.config = { ...this.config, ...config }
    this.logger = logger
  }

  static convertToFitActivities(workouts: WorkoutT[]): ActivityT[] {
    const result: ActivityT[] = []
    let tempA: ActivityT
    let tempS: ActivityT['sets']['0']

    for (const workout of workouts) {
      tempA = {
        name: `Workout_${workout.date.toISOString().split('T')[0]}`,
        startTime: workout.date,
        sets: [],
      }

      for (const exercise of workout.exercises) {
        const fitExerciseCode =
          EXERCISE_TO_FIT_CATEGORY_MAP[exercise.fitnotesName]

        if (!fitExerciseCode) {
          console.log(
            `Couldn\'t find a mapping for exercise ${exercise.fitnotesName}. Skipping.`
          )
          continue
        }

        for (const set of exercise.sets) {
          tempS = {
            ...fitExerciseCode,
            reps: set.reps,
            weight: set.weight,
            duration: set.time ? set.time * 60 : 0,
            type: 1,
          }
          tempA.sets.push(tempS)
        }
      }
      result.push(tempA)
    }
    console.log(JSON.stringify(result))
    return result
  }

  async writeActivitiesToFitFiles(activities: ActivityT[]): Promise<string[]> {
    this.logger('numOfActivities:', activities.length)
    const filepaths: string[] = []
    const settings = await getDataExportSettings()
    for (const activity of activities) {
      const encodedActivity = new ActivityEncoder(activity, settings)
      const filePath = path.join(
        fs.CachesDirectoryPath,
        `${activity.name}.fit`
      )
      console.log(filePath)
      await fs.writeFile(filePath, Buffer.from(encodedActivity.getFile()).toString('utf8'))
      filepaths.push(filePath)
    }
    return filepaths
  }
}
