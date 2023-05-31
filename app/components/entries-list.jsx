import Entry from './entry'

const BlogList = ({ entries }) => {
  return (
    <>
      <h2 className='heading'>Blog</h2>
      <div className='blog'>
        {entries.map(a => (
          <Entry
            key={a.id}
            entry={a.attributes}
          />
        ))}
      </div>

    </>
  )
}

export default BlogList
