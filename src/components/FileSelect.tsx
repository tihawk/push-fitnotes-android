import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import { Button } from "react-native-paper"
import DocumentPicker, {DocumentPickerResponse, types} from 'react-native-document-picker'
import { CSVParser } from "../csv-parser";
import { WorkoutT } from "../util/interfaces";

interface FileSelectI {
  setWorkouts: Dispatch<SetStateAction<WorkoutT[]>>
}
function FileSelect({setWorkouts}: FileSelectI) {
  const [fileResponse, setFileResponse] = useState<DocumentPickerResponse>();
  useEffect(() => {
    console.log('use effect triggered')
    if (fileResponse?.fileCopyUri) {
      console.log('will parse')
      handleParseCSV(fileResponse.fileCopyUri)
    }
  }, [fileResponse])
  
  const handleParseCSV = async (path: string) => {
    console.log('will create a parser for file at', path)
    const csvParser = new CSVParser({csvFilePath: path}, console.log)
    console.log('will run parseData')
    const workouts: WorkoutT[] = await csvParser.parseData()
    setWorkouts(workouts)
    console.log(JSON.stringify(workouts))
  }

  const handleLoadCSV = useCallback(async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [types.csv, 'text/comma-separated-values'],
        copyTo: 'cachesDirectory'
      });
      console.log(response)
      console.log(response?.fileCopyUri)
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, [])
  return (
    <>
      <Button onPress={handleLoadCSV}>Load CSV</Button>
    </>
  )
}

export default FileSelect