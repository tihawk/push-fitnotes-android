import { parse } from 'csv-parse'
import fs from 'react-native-fs'
import { WorkoutT, FitNotesCSVRowT, CSVParserConfigI } from '../util/interfaces'
import { promisify, timeStringToFloatMinutes } from '../util'
// import { promises } from 'stream'
import { CSV_DIR } from '../util/constants'
// import { parse } from 'csv-parse/.'

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
    console.log(fs.DocumentDirectoryPath)
    const result: any[] = []//: WorkoutT[] = []
    console.log(this.config.csvFilePath)
    const parseCsvData = promisify(parse)
    // const file = fs.readFile(this.config.csvFilePath, (err, data) => {
    //   if (err) {
    //     console.error(err)
    //   }
    //   console.log(data)
    //   return result.push(data.toString('utf-8'))
    // })

    await fs.readFile(this.config.csvFilePath, 'utf8')
      .then(async data => {
        await parseCsvData(data, {columns: true})
          .then(csvArray => {
            // @ts-ignore
            for (const row of csvArray) {
              if (!this.isValidRow(row)) {
                console.error('Not a valid csv row!')
                console.error(
                  `Found an invalid row in csv: ${JSON.stringify(
                    row
                  )}. Cancelling CSV parsing.`
                )
              }
              console.log('parsing row')
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
            }
          })
          .catch(err => console.error)
      })
      .catch(err => console.error)

    // const csvData = await csvDataRead(this.config.csvFilePath)
    // console.log(csvData)

    // const parser = fs
    //   .createReadStream(this.config.csvFilePath)
    //   .pipe(parse({ columns: true }))
    //   .on('data', (row: any) => {
    //     if (!this.isValidRow(row)) {
    //       console.error('Not a valid csv row!')
    //       console.error(
    //         `Found an invalid row in csv: ${JSON.stringify(
    //           row
    //         )}. Cancelling CSV parsing.`
    //       )
    //     }
    //     console.log('parsing row')
    //     const temp: WorkoutT = {
    //       meta: {
    //         selected: false,
    //         converted: false,
    //         uploaded: false,
    //         fitFilename: '',
    //       },
    //       date: new Date(row.Date),
    //       exercises: [
    //         {
    //           fitnotesName: row.Exercise,
    //           fitnotesCategory: row.Category,
    //           sets: [
    //             {
    //               reps: row.Reps,
    //               weight: row['Weight (kgs)'],
    //               time: timeStringToFloatMinutes(row.Time),
    //             },
    //           ],
    //         },
    //       ],
    //     }

    //     const workoutIndex = this.findWorkoutIndex(result, temp)
    //     if (workoutIndex > -1) {
    //       const exerciseIndex = this.findExerciseIndex(
    //         result,
    //         workoutIndex,
    //         temp
    //       )
    //       if (exerciseIndex > -1) {
    //         result[workoutIndex].exercises[exerciseIndex].sets.push(
    //           ...temp.exercises[0].sets
    //         )
    //       } else {
    //         result[workoutIndex].exercises.push(...temp.exercises)
    //       }
    //     } else {
    //       result.push(temp)
    //     }
    //   })
    //   .on('end', function () {
    //     console.log('finished parsing csv')
    //     return result
    //   })
    //   .on('error', function (error) {
    //     console.log(error.message)
    //   })

    // await promises.finished(parser)
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
