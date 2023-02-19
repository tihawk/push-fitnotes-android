import { parse } from 'csv-parse'
import path from 'path'
import fs from 'fs'
import { WorkoutT, FitNotesCSVRowT, CSVParserConfigI } from '../util/interfaces'
import { timeStringToFloatMinutes } from '../util'
import { promises } from 'stream'
import { CSV_DIR } from '../util/constants'

export class CSVParser {
  config: CSVParserConfigI = {
    csvFilePath: '',
    csvDir: CSV_DIR,
  }
  logger
  constructor(config: CSVParserConfigI, logger: any) {
    this.config = { ...this.config, ...config }
    this.logger = logger
  }

  async parseData(): Promise<WorkoutT[]> {
    const result: WorkoutT[] = []
    const parser = fs
      .createReadStream(path.resolve(this.config.csvFilePath))
      .pipe(parse({ columns: true }))
      .on('data', (row: any) => {
        if (!this.isValidRow(row)) {
          console.error('Not a valid csv row!')
          throw new Error(
            `Found an invalid row in csv: ${JSON.stringify(
              row
            )}. Cancelling CSV parsing.`
          )
        }
        const temp: WorkoutT = {
          meta: {
            selected: false,
            converted: false,
            uploaded: false,
            fitFilename: '',
          },
          date: new Date(row.Date),
          exercises: [
            {
              fitnotesName: row.Exercise,
              fitnotesCategory: row.Category,
              sets: [
                {
                  reps: row.Reps,
                  weight: row['Weight (kgs)'],
                  time: timeStringToFloatMinutes(row.Time),
                },
              ],
            },
          ],
        }

        const workoutIndex = this.findWorkoutIndex(result, temp)
        if (workoutIndex > -1) {
          const exerciseIndex = this.findExerciseIndex(
            result,
            workoutIndex,
            temp
          )
          if (exerciseIndex > -1) {
            result[workoutIndex].exercises[exerciseIndex].sets.push(
              ...temp.exercises[0].sets
            )
          } else {
            result[workoutIndex].exercises.push(...temp.exercises)
          }
        } else {
          result.push(temp)
        }
      })
      .on('end', function () {
        console.log('finished parsing csv')
        return result
      })
      .on('error', function (error) {
        console.log(error.message)
      })

    await promises.finished(parser)
    return result
  }

  findWorkoutIndex(data: WorkoutT[], term: WorkoutT) {
    return data.findIndex(
      (el) => el.date.toISOString() === term.date.toISOString()
    )
  }

  findExerciseIndex(data: WorkoutT[], workoutIndex: number, term: WorkoutT) {
    return data[workoutIndex].exercises.findIndex(
      (el) => el.fitnotesName === term.exercises[0].fitnotesName
    )
  }

  isValidRow(row: FitNotesCSVRowT): row is FitNotesCSVRowT {
    return !!row.Date.match(/\d\d\d\d-\d\d-\d\d/)?.length && !!row.Exercise
  }
}
