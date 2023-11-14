import React from 'react'

const CreateListing = () => {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center mt-7'>Create a Listing</h1>
        <form className='flex flex-col md:flex-row mt-4 gap-4'>
            <div className='flex flex-col justify-between gap-4 flex-1'>
                <input type="text" name="name"
                className='border p-3 rounded-lg' 
                placeholder='Name' maxLength="62" minLength="10" required/>
                <textarea type="text" name="description"
                className='border p-3 rounded-lg' 
                placeholder='Description'  required/>
                <input type="text" name="address"
                className='border p-3 rounded-lg' 
                placeholder='Address' maxLength="62" minLength="10" required/>

                <div className='flex gap-4 flex-wrap border border-gray-300 p-3 rounded-lg '>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="sale" className='w-4' id='sale' />
                        <label htmlFor="sale">Sale</label>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="rent" className='w-4' id='rent' />
                        <label htmlFor="rent">Rent</label>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="parking" className='w-4' id='parking' />
                        <label htmlFor="parking">Parking</label>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="furnished" className='w-4' id='furnished' />
                        <label htmlFor="furnished">Furnished</label>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="offer" className='w-4' id='offer' />
                        <label htmlFor="offer">Offer</label>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-4 flex-1'>
                <div className='flex gap-4 flex-wrap'>
                    <div className='flex gap-2 items-center'>
                        <input type="number" name="bedrooms"
                        className='border border-gray-300 p-2 rounded-lg'
                        id="bedroom" min="1" max="10" required />
                        <label htmlFor="bedroom">Bedroom</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="number" name="bathrooms"
                        className='border border-gray-300 p-2 rounded-lg' 
                        id="bathroom" min="1" max="10" required />
                        <label htmlFor="bathroom">Bathroom</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="number" name="regularPrice"
                        className='border border-gray-300 p-2 rounded-lg' 
                        id="regularPrice" min="1" max="10" required />
                        <label className='flex flex-col' htmlFor="regularPrice">
                            Price
                            <span className='text-xs font-semibold'>($ / month)</span>
                        </label>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="number" name="discountPrice"
                        className='border border-gray-300 p-2 rounded-lg' 
                        id="discountPrice" min="1" max="10" required />
                        <label className='flex flex-col' htmlFor="discountPrice">
                            Discount Price
                            <span className='text-xs font-semibold'>($ / month)</span>
                        </label>
                    </div>
                </div>
                <p className='font-semibold'>Images : <span className='text-slate-500'>The first image will be the cover (max 6)</span></p>
                <div className='flex justify-between'>
                    <input className='border border-gray-300 rounded-lg p-3' type="file" name='images' accept='image/*' multiple />
                    <button className='border border-green-600 text-green-600 px-3 py-2 rounded font-semibold hover:shadow-md disabled:opcaity-60'>UPLOAD</button>
                </div>
                <button className='p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:bg-slate-400'>CREATE LISTING</button>
            </div>
        </form>
    </main>
  )
}

export default CreateListing