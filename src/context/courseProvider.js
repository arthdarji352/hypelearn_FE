import React, { useContext } from 'react'
// import useLocalStorage from '../hooks/useLocalStorage'

const CourseContext = React.createContext()

export function useCourse() {
  return useContext(CourseContext)
}

export function CourseProvider({ children }) {
  // const [contacts, setContacts] = useLocalStorage('email', [])
  // const [allCourse, setAllCourse] = useState(null)

  // const { opendCourse, setOpenedCourse } = useGlobalContext()

  // function createCourse(course) {
  //   setOpenedCourse(course)

  //   // setContacts((prevContacts) => {
  //   //   return [...prevContacts, { name: course.name, email: course.email }]
  //   // })
  // }


  // const getCourse = async () => { 
  //   return await axios
  //     .post(`/api/getUser`, { courseName:  opendCourse})
  //     .then(({ data }) => {
  //      console.log('get course api', data)
  //      setOpenedCourse(data)
  //       return data
  //     })
  //     .catch((error) => {
  //      console.error(error)
  //       return error
  //     })
  // }

  // useEffect(() => {
  //   getCourse();
  
  // }, []);
  

  // useEffect(() => {
  //   var str = window.location.href
  //   console.log('url', str)
  //   var last = str.substring(str.lastIndexOf('/') + 1, str.length)
  //   console.log('loaded page id', last)
  //   if (last === NaN) {
  //     setOpendCourse(courses[last])
  //   } else {
  //     setOpendCourse({
  //       id: 1,
  //       courseName: 'Angular Material Masterclass & FREE E-Book',
  //       imageSrc: '',
  //       imageAlt: 'alt',
  //       author: ' Abhi Kalu',
  //       price: '$45',
  //       Rating: 5,
  //       tags: 'Bestseller',
  //       email: 'amkalavadiya2@gmail.com',
  //     })
  //   }
  // }, [opendCourse])

  return (
    <CourseContext.Provider value={{  }}>
      {children}
    </CourseContext.Provider>
  )
}
