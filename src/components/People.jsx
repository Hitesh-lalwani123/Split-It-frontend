
const People = ({people}) => {
  return (
    <div>
        People involved: 
      {people.map((person, ind) => {
        return (
          <div key={ind}>
            <span>
              {person.name} to Hitesh: {person.toHitesh} ,
            </span>
            <span>
              {person.name} to Kirti: {person.toKirti} ,
            </span>
            <span>
              {person.name} to Varun: {person.toVarun} ,
            </span>
          </div>
        );
      })}
    </div>
  )
}

export default People