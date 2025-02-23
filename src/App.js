import React from "react";


const App = () => {
  const [currentScreen, setCurrentScreen] = React.useState(1);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    contactNumber: '',
    gender: '',
    college: '',
    passingYear: '',
    collegeCity: '',
    bio: '',
    skills: []
  });


  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters long' : '';
      case 'email':
        return !validateEmail(value) ? 'Please enter a valid email address' : '';
      case 'contactNumber':
        return !validatePhone(value) ? 'Please enter a valid 10-digit phone number' : '';
      case 'gender':
        return !value ? 'Please select a gender' : '';
      case 'college':
        return value.length < 3 ? 'College name must be at least 3 characters long' : '';
      case 'passingYear':
        return !value ? 'Please select your passing year' : '';
      case 'collegeCity':
        return !value ? 'Please select your college city' : '';
      case 'bio':
        return value.length < 50 ? 'Bio must be at least 50 characters long' : '';
      default:
        return '';
    }
  };

  const validateScreen = (screenNumber) => {
    const screenFields = {
      1: ['name', 'email', 'contactNumber', 'gender'],
      2: ['college', 'passingYear', 'collegeCity'],
      3: ['bio']
    };

    const newErrors = {};
    screenFields[screenNumber].forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNext = () => {

    if(currentScreen === 1 ){
      if(!formData.name || !formData.email || !formData.contactNumber || !formData.gender){
        window.alert("all field are require")
        return
      }
    }
    if(currentScreen === 2 ){
      if(!formData.college || !formData.passingYear || !formData.collegeCity){
        window.alert("all field are require")
        return
      }
    }
    

    if (currentScreen < 3) {
      setCurrentScreen(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentScreen > 1) {
      setCurrentScreen(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {

    if(!formData.bio || !formData.skills ){
      window.alert("all field are require")
      return
    }

    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleSkillSelect = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleEdit = () => {
    setIsSubmitted(false);
    setCurrentScreen(1);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Submitted Data</h2>
          
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded">
              <p className="text-green-800">Form submitted successfully!</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid gap-2">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-sm">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact Number</p>
                  <p className="text-sm">{formData.contactNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="text-sm capitalize">{formData.gender}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Educational Information</h3>
              <div className="grid gap-2">
                <div>
                  <p className="text-sm text-gray-500">College/School</p>
                  <p className="text-sm">{formData.college}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Passing Year</p>
                  <p className="text-sm">{formData.passingYear}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">College City</p>
                  <p className="text-sm">{formData.collegeCity}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Additional Information</h3>
              <div className="grid gap-2">
                <div>
                  <p className="text-sm text-gray-500">Bio</p>
                  <p className="text-sm">{formData.bio}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleEdit}
            className="w-full mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Information
          </button>
        </div>
      </div>
    );
  }

  const years = Array.from({length: 10}, (_, i) => new Date().getFullYear() + i);
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];
  const skillOptions = ['JavaScript', 'React', 'Python', 'Java', 'C++', 'Node.js'];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Registration Form - Screen {currentScreen}
        </h2>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  currentScreen >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-full bg-blue-600 rounded transition-all duration-300"
              style={{ width: `${((currentScreen - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentScreen === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <div className="space-x-4">
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <label key={gender} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={gender.toLowerCase()}
                        checked={formData.gender === gender.toLowerCase()}
                        onChange={handleInputChange}
                        className="mr-2"
                        required
                      />
                      <span className="text-sm">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentScreen === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">College/School Name</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Passing Year</label>
                <select
                  name="passingYear"
                  value={formData.passingYear}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">College City</label>
                <select
                  name="collegeCity"
                  value={formData.collegeCity}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {currentScreen === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Skills (Optional)</label>
                <select
                  onChange={(e) => handleSkillSelect(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  value=""
                >
                  <option value="">Select Skills</option>
                  {skillOptions.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.skills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {currentScreen > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Back
              </button>
            )}
            <button
              type={currentScreen === 3 ? 'submit' : 'button'}
              onClick={currentScreen === 3 ? undefined : handleNext}
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                currentScreen === 1 ? 'ml-auto' : ''
              }`}
            >
              {currentScreen === 3 ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;