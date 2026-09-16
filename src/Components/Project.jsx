import { useEffect, useMemo, useState } from 'react'
import { projectsData } from '../assets/assets'

function Project({ user }) {
    const [selectedProject, setSelectedProject] = useState(null)
    const [showWishlist, setShowWishlist] = useState(false)
    const wishlistKey = `estateWishlist_${user.email}`
    const [wishlist, setWishlist] = useState(() => {
        try {
            const savedWishlist = localStorage.getItem(`estateWishlist_${user.email}`)
            return savedWishlist ? JSON.parse(savedWishlist) : []
        } catch {
            return []
        }
    })
    const [filters, setFilters] = useState({
        location: '',
        maxPrice: '',
        bedrooms: '',
        type: '',
    })

    useEffect(() => {
        localStorage.setItem(wishlistKey, JSON.stringify(wishlist))
    }, [wishlist, wishlistKey])

    const filteredProjects = useMemo(() => projectsData.filter((project) => {
        const price = Number(project.price.replace(/[₹$,]/g, ''))
        const matchesLocation = !filters.location || project.location === filters.location
        const matchesPrice = !filters.maxPrice || price <= Number(filters.maxPrice)
        const matchesBedrooms = !filters.bedrooms || project.bedrooms >= Number(filters.bedrooms)
        const matchesType = !filters.type || project.type === filters.type
        const projectKey = `${project.title}-${project.location}`
        const matchesWishlist = !showWishlist || wishlist.includes(projectKey)

        return matchesLocation && matchesPrice && matchesBedrooms && matchesType && matchesWishlist
    }), [filters, showWishlist, wishlist])

    function updateFilter(event) {
        const { name, value } = event.target
        setFilters((currentFilters) => ({ ...currentFilters, [name]: value }))
    }

    function clearFilters() {
        setFilters({ location: '', maxPrice: '', bedrooms: '', type: '' })
    }

    function getProjectKey(project) {
        return `${project.title}-${project.location}`
    }

    function toggleWishlist(project) {
        const projectKey = getProjectKey(project)
        setWishlist((currentWishlist) => currentWishlist.includes(projectKey)
            ? currentWishlist.filter((savedKey) => savedKey !== projectKey)
            : [...currentWishlist, projectKey])
    }

    return (
        <div className='property-section mb-18' id='project'>
            <div className='flex items-center justify-center content-center mb-15 mt-15'>
                <div className="highlight  mx-2 px-2">
                    <p className='text-4xl font-bold m-2 '>Find Your <span className='underline font-normal ml-2 text-3xl'>Next Home</span></p>
                    <p className='font-extralight'>Browse properties and narrow your search by what matters most.</p>
                </div>
            </div>
            <div className="property-filters" aria-label="Property search filters">
                <select name="location" value={filters.location} onChange={updateFilter}>
                    <option value="">Any location</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Pune">Pune</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Kochi">Kochi</option>
                    <option value="Noida">Noida</option>
                </select>
                <select name="maxPrice" value={filters.maxPrice} onChange={updateFilter}>
                    <option value="">Any price</option>
                    <option value="8000000">Up to ₹80 lakh</option>
                    <option value="12000000">Up to ₹1.2 crore</option>
                    <option value="20000000">Up to ₹2 crore</option>
                </select>
                <select name="bedrooms" value={filters.bedrooms} onChange={updateFilter}>
                    <option value="">Any bedrooms</option>
                    <option value="2">2+ bedrooms</option>
                    <option value="3">3+ bedrooms</option>
                    <option value="4">4+ bedrooms</option>
                    <option value="5">5 bedrooms</option>
                </select>
                <select name="type" value={filters.type} onChange={updateFilter}>
                    <option value="">Any property type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Villa">Villa</option>
                    <option value="Independent House">Independent House</option>
                </select>
                <button type="button" className="clear-filters" onClick={clearFilters}>Clear</button>
                <button
                    type="button"
                    className={showWishlist ? 'wishlist-filter active' : 'wishlist-filter'}
                    onClick={() => setShowWishlist((isVisible) => !isVisible)}
                >
                    <span aria-hidden="true">♥</span> Saved ({wishlist.length})
                </button>
            </div>
            <p className="property-count">{filteredProjects.length} {filteredProjects.length === 1 ? 'property' : 'properties'} found</p>
            {filteredProjects.length > 0 ? (
                <div className="property-grid">
                    {filteredProjects.map((project) => (
                        <article
                            className="property-card"
                            key={project.title + project.location + project.image}
                            role="button"
                            tabIndex="0"
                            onClick={() => setSelectedProject(project)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault()
                                    setSelectedProject(project)
                                }
                            }}
                        >
                            <img src={project.image} alt={project.title} />
                            <button
                                type="button"
                                className={wishlist.includes(getProjectKey(project)) ? 'wishlist-button saved' : 'wishlist-button'}
                                aria-label={wishlist.includes(getProjectKey(project)) ? `Remove ${project.title} from wishlist` : `Save ${project.title} to wishlist`}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    toggleWishlist(project)
                                }}
                            >
                                {wishlist.includes(getProjectKey(project)) ? '♥' : '♡'}
                            </button>
                            <div className="property-card-content">
                                <div className="property-card-heading">
                                    <h3>{project.title}</h3>
                                    <strong>{project.price}</strong>
                                </div>
                                <p>{project.location} &middot; {project.bedrooms} bedrooms &middot; {project.bathrooms || 2} bathrooms</p>
                                <p>{project.area || '1,800 sq ft'}</p>
                                <span>{project.type}</span>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <p className="no-properties">No properties match these filters. Try widening your search.</p>
            )}
            {selectedProject && (
                <div className="property-modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}>
                    <div
                        className="property-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="property-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="property-modal-close"
                            aria-label="Close property details"
                            onClick={() => setSelectedProject(null)}
                        >
                            ×
                        </button>
                        <img src={selectedProject.image} alt={selectedProject.title} />
                        <div className="property-modal-content">
                            <p className="property-modal-type">{selectedProject.type}</p>
                            <h2 id="property-modal-title">{selectedProject.title}</h2>
                            <strong className="property-modal-price">{selectedProject.price}</strong>
                            <p className="property-modal-location">{selectedProject.location}, India</p>
                            <div className="property-modal-details">
                                <span>{selectedProject.bedrooms} Bedrooms</span>
                                <span>{selectedProject.bathrooms || 2} Bathrooms</span>
                                <span>{selectedProject.area || '1,800 sq ft'}</span>
                            </div>
                            <div className="property-modal-extra-details">
                                <div><small>Possession</small><strong>{selectedProject.possession || 'Ready to move'}</strong></div>
                                <div><small>Parking</small><strong>{selectedProject.parking || '1 covered car'}</strong></div>
                                <div><small>Furnishing</small><strong>{selectedProject.furnishing || 'Semi-furnished'}</strong></div>
                                <div><small>Facing</small><strong>{selectedProject.facing || 'East facing'}</strong></div>
                            </div>
                            <p className="property-modal-description">
                                A thoughtfully planned {selectedProject.type.toLowerCase()} in {selectedProject.location}, designed for comfortable Indian family living with practical spaces, natural light, and easy access to schools, workplaces, and everyday conveniences.
                            </p>
                            <h3 className="property-modal-amenities-title">Home amenities</h3>
                            <div className="property-modal-amenities">
                                {(selectedProject.amenities || ['Modular kitchen', '24-hour security', 'Power backup', 'Water supply']).map((amenity) => (
                                    <span key={amenity}>{amenity}</span>
                                ))}
                            </div>
                            <a className="property-modal-contact" href="#Contact" onClick={() => setSelectedProject(null)}>
                                Enquire About This Home
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Project
