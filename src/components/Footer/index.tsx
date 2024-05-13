const Footer = () => {
  return (
    <div>
      <footer className='container mx-auto p-2 lg:px-0'>
        <div className='flex space-x-2 text-sm text-gray-400'>
          <p>{new Date().getFullYear()} &copy;</p>
          <p>B2B портал Ak Cent Microsystems</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
