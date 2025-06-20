import Accordion from "../src/components/Accordion";
import AirportPairControls from '../src/components/AirportPairControls';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto py-8">
        <h2 className="text-xl font-semibold mb-6 text-center">Great Circle Visualizer</h2>
        <p className="text-center mb-8">Visualize great circles routes between any two airport locations on Earth using different map projections & compare to globe view</p>
        
        {/* Keep the existing first accordion */}
        <Accordion title="Map Projections & Great Circle Visualization" defaultOpen={true}>
          <div className="p-4">
            <AirportPairControls />
          </div>
        </Accordion>
        
        {/* Add the Compare Great Circles and Rhumb Lines accordion */}
        <Accordion title="Compare Great Circles and Rhumb Lines">
          <div className="p-4">
            <div className="mb-4">
              <div className="flex items-center mb-4">
                <div className="legend-item flex items-center mr-6">
                  <div className="w-4 h-4 bg-red-500 mr-2"></div>
                  <div className="text-sm">Great Circle</div>
                </div>
                <div className="legend-item flex items-center">
                  <div className="w-4 h-4 bg-black mr-2"></div>
                  <div className="text-sm">Rhumb Line</div>
                </div>
              </div>
              <p className="mb-4">
                This section compares Great Circle routes (shortest path between two points on a sphere) with Rhumb Line routes (constant bearing paths).
              </p>
              <p>
                Great Circle routes appear as straight lines on a globe but curved on most map projections, while Rhumb Line routes maintain a constant bearing but are usually longer than Great Circle routes.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md text-center text-gray-500 h-64 flex items-center justify-center">
              Map comparison visualization will be implemented here
            </div>
          </div>
        </Accordion>

        {/* Add the How to Use accordion */}
        <Accordion title="How to Use the Great Circle Visualizer">
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-3">Getting Started</h3>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Select countries from the dropdown menus for Airport A and Airport B.</li>
              <li>Search for specific airports within those countries using the search fields.</li>
              <li>Click "Add" to add the airport pair to your visualization.</li>
              <li>Click "Update Flight Paths" to display the routes on the map.</li>
              <li>Use the "Suggestions" button to see popular airport pairs.</li>
            </ol>
            
            <h3 className="font-semibold text-lg mb-3 mt-6">Working with Airport Pairs</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Click on an airport pair tag to expand it and see detailed information.</li>
              <li>Use the remove button (×) to delete unwanted airport pairs.</li>
              <li>Only one airport pair can be expanded at a time.</li>
            </ul>
            
            <h3 className="font-semibold text-lg mb-3 mt-6">Map Controls</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Select different map projections from the dropdown menu.</li>
              <li>Compare how flight paths appear on different projections.</li>
              <li>Toggle between 2D and 3D views to understand the true path of flights.</li>
            </ul>
          </div>
        </Accordion>
        
        {/* Add the Learn More accordion with nested content */}
        <Accordion title="Learn More">
          <div className="p-4">
            <Accordion title="Understanding Map Projections" nested={true}>
              <div className="p-4">
                <p className="mb-4">
                  Map projections are methods of representing the Earth's spherical surface on a flat plane. Each projection has its own advantages and distortions.
                </p>
                <h4 className="font-semibold mb-2">Common Map Projections:</h4>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li><strong>Mercator:</strong> Preserves angles but distorts size, especially near the poles.</li>
                  <li><strong>Equirectangular:</strong> Simple but significant distortion in high latitudes.</li>
                  <li><strong>Orthographic:</strong> Shows Earth as seen from space, but only half the globe is visible.</li>
                  <li><strong>Azimuthal Equidistant:</strong> Preserves distances from the center point.</li>
                  <li><strong>Robinson:</strong> Compromise projection that reduces distortion visually.</li>
                </ul>
                
                <h4 className="font-semibold mb-2 mt-4">Beginners Guide to Map Projections</h4>
                <p className="mb-2">A great introduction to the topic of map projections:</p>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    className="w-full h-64"
                    src="https://tube.rvere.com/embed?v=wlfLW1j05Dg&start=0&fs=0"
                    title="Map Projections for Beginners"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy">
                  </iframe>
                </div>
                
                <h4 className="font-semibold mb-2 mt-4">Map Projections Overview</h4>
                <p className="mb-2">Best & worst? Strangest?:</p>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    className="w-full h-64"
                    src="https://tube.rvere.com/embed?v=EnW7TPnDN8Y&start=0&fs=0"
                    title="Overview of Map Projections"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy">
                  </iframe>
                </div>
                
                <h4 className="font-semibold mb-2 mt-4">Why All World Maps Are 'Wrong'</h4>
                <p className="mb-2">Entertaining but true:</p>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    className="w-full h-64"
                    src="https://tube.rvere.com/embed?v=kIID5FDi2JQ&start=0&fs=0"
                    title="Why All World Maps Are Wrong"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy">
                  </iframe>
                </div>
                
                <h4 className="font-semibold mb-2 mt-4">Cartography, Projections, and Scales</h4>
                <p className="mb-2">Aviation theory:</p>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    className="w-full h-64"
                    src="https://tube.rvere.com/embed?v=ZwXrlx7FT0c&start=0&fs=0"
                    title="Cartography, Projections, and Scales in Aviation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy">
                  </iframe>
                </div>
                
                <p className="mt-4">
                  Understanding these projections helps explain why flight paths appear curved on most maps but are actually the shortest routes when viewed on a globe.
                </p>
              </div>
            </Accordion>
            
            <Accordion title="Exploring Great Circles" nested={true}>
              <div className="p-4">
                <p className="mb-4">
                  A great circle is the largest circle that can be drawn on a sphere, dividing it into two equal hemispheres. On Earth, great circles represent the shortest path between two points.
                </p>
                
                <h4 className="font-semibold mb-2">Visualizing Great Circles</h4>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    className="w-full h-64"
                    src="https://tube.rvere.com/embed?v=T41niy7sbgA&fs=0"
                    title="Great Circles are Straight Lines (as much as that's possible on a sphere)"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy">
                  </iframe>
                </div>
                
                <h4 className="font-semibold mb-2 mt-4">Comparing Great Circles and Rhumb Lines</h4>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    className="w-full h-64"
                    src="https://tube.rvere.com/embed?v=3BF_ZKfJiso&fs=0"
                    title="Comparing Great Circles and Rhumb Lines"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy">
                  </iframe>
                </div>
                
                <h4 className="font-semibold mb-2 mt-4">The Equator and Lines of Longitude</h4>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    className="w-full h-64"
                    src="https://tube.rvere.com/embed?v=0iGQVapEJGI&fs=0"
                    title="The Equator and Lines of Longitude"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy">
                  </iframe>
                </div>
                
                <h4 className="font-semibold mb-2 mt-4">Real-World Applications</h4>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    className="w-full h-64"
                    src="https://tube.rvere.com/embed?v=5-lnBgat96o&start=0&fs=0"
                    title="Real-World Applications of Great Circles"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy">
                  </iframe>
                </div>
                
                <p className="mt-4">
                  When flying long distances, aircraft typically follow great circle routes to minimize fuel consumption and flight time. However, these routes may appear curved on most map projections.
                </p>
                <p className="mt-2">
                  The apparent curvature of flight paths on maps often surprises people who expect straight lines to represent the shortest distance. This visualization tool helps demonstrate why these "curved" paths are actually the most efficient routes.
                </p>
                
                <h4 className="font-semibold mb-2 mt-4">Additional Resources</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <a href="http://www.gcmap.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">
                      Great Circle Mapper
                    </a>
                  </li>
                  <li>
                    <a href="https://gisgeography.com/great-circle-geodesic-line-shortest-flight-path/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">
                      Why Are Great Circles the Shortest Flight Path?
                    </a>
                  </li>
                  <li>
                    <a href="https://www.greatcirclemap.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">
                      Great Circle Map
                    </a>
                  </li>
                </ul>
              </div>
            </Accordion>
            
            <Accordion title="Navigation Through History" nested={true}>
              <div className="p-4">
                <p className="mb-4">
                  Throughout history, navigation methods have evolved dramatically:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>Ancient Navigation:</strong> Early sailors used celestial bodies, landmarks, and basic tools like the astrolabe.</li>
                  <li><strong>Compass and Charts:</strong> The magnetic compass (12th century) revolutionized navigation, allowing sailors to determine direction without visible landmarks.</li>
                  <li><strong>Sextant and Chronometer:</strong> These 18th-century inventions enabled accurate determination of latitude and longitude.</li>
                  <li><strong>Radio Navigation:</strong> Systems like LORAN (1940s) used radio signals to determine position.</li>
                </ul>
                
                <h4 className="font-semibold mb-2">Ancient Maritime Cultures and Celestial Navigation</h4>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe 
                    className="w-full h-64"
                    src="https://tube.rvere.com/embed?v=TWm52IPPZjI&start=0&fs=0"
                    title="Ancient Maritime Cultures and Celestial Navigation" 
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy">
                  </iframe>
                </div>
                
                <h4 className="font-semibold mb-2 mt-4">Eratosthenes and the Earth's Circumference</h4>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe 
                    className="w-full h-64"
                    src="https://tube.rvere.com/embed?v=zkB_B4lTaBc&start=0&fs=0"
                    title="Eratosthenes and the Earth's Circumference" 
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy">
                  </iframe>
                </div>
                
                <h4 className="font-semibold mb-2 mt-4">Solving the 'Longitude Problem' - John Harrison and the Marine Chronometer</h4>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe 
                    className="w-full h-64"
                    src="https://tube.rvere.com/embed?v=b7yoXhbOQ3Y&start=0&fs=0"
                    title="Solving the 'Longitude Problem' - John Harrison and the Marine Chronometer" 
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy">
                  </iframe>
                </div>
                
                <p className="mt-4">
                  Before modern navigation tools, following great circle routes was challenging. Ships often followed rhumb lines (constant compass bearing) despite the longer distance because they were easier to navigate.
                </p>
              </div>
            </Accordion>
            
            <Accordion title="Modern Navigation Systems" nested={true}>
              <div className="p-4">
                <p className="mb-4">
                  Today's navigation relies primarily on satellite-based systems:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>GPS (Global Positioning System):</strong> The U.S. satellite navigation system providing global coverage.</li>
                  <li><strong>GLONASS:</strong> Russia's equivalent to GPS.</li>
                  <li><strong>Galileo:</strong> The European Union's global satellite navigation system.</li>
                  <li><strong>BeiDou:</strong> China's navigation satellite system.</li>
                </ul>
                
                <h4 className="font-semibold mb-2">GPS and Satellites in the 20th Century</h4>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe 
                    className="w-full h-64"
                    src="https://tube.rvere.com/embed?v=fbtAXgdwkeg&start=0&fs=0&modestbranding=1" 
                    title="GPS and Satellites in the 20th Century" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                    loading="lazy">
                  </iframe>
                </div>
                
                <h4 className="font-semibold mb-2 mt-4">21st Century Developments</h4>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe 
                    className="w-full h-64"
                    src="https://tube.rvere.com/embed?v=KoOxTV3QIrM&start=0&fs=0&modestbranding=1" 
                    title="21st Century Navigation Developments" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                    loading="lazy">
                  </iframe>
                </div>
                
                <p className="mt-4">
                  Aircraft use these systems along with inertial navigation systems (INS) and ground-based aids to follow precise flight paths. Modern flight management computers automatically calculate great circle routes and adjust for winds, airspace restrictions, and other factors.
                </p>
                <p className="mt-2">
                  This technology allows aircraft to efficiently follow great circle routes, saving time and fuel on long-distance flights.
                </p>
              </div>
            </Accordion>
            

          </div>
        </Accordion>
        
        {/* Contact Us accordion */}
        <Accordion title="Contact us">
          <div className="p-4">
            <p className="mb-4">
              We're always happy to hear from users of our Great Circle Visualizer. If you have any questions, suggestions, or feedback, please don't hesitate to get in touch with us.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="mb-4">
              You can reach us at <a href="mailto:info@greatcirclevisualizer.com" className="text-blue-600 hover:text-blue-800 hover:underline">
                info@greatcirclevisualizer.com
              </a>. We aim to respond to all inquiries within 2 business days.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">Feedback</h3>
            <p>
              Your feedback is important to us. If you have any suggestions for improvements or new features, please let us know.
            </p>
          </div>
        </Accordion>
        
      </main>
    </div>
  );
}
