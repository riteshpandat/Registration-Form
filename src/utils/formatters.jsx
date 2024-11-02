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

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleNext = () => {
    if (validateScreen(currentScreen)) {
      setCurrentScreen(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentScreen > 1) {
      setCurrentScreen(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateScreen(currentScreen)) {
      setIsSubmitted(true);
    }
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
    setErrors({});
    setTouched({});
  };

  const FormField = ({ label, name, type = 'text', value, onChange, onBlur, error, touched, ...props }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={() => onBlur(name)}
          className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
            touched && error ? 'border-red-500' : 'border-gray-300'
          }`}
          {...props}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={() => onBlur(name)}
          className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
            touched && error ? 'border-red-500' : 'border-gray-300'
          }`}
          {...props}
        >
          {props.children}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={() => onBlur(name)}
          className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
            touched && error ? 'border-red-500' : 'border-gray-300'
          }`}
          {...props}
        />
      )}
      {touched && error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );

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
              <FormField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
                required
                placeholder="Enter your full name"
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                required
                placeholder="Enter your email address"
              />
              <FormField
                label="Contact Number"
                name="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={errors.contactNumber}
                touched={touched.contactNumber}
                required
                placeholder="Enter 10-digit number"
              />
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Gender<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="space-x-4">
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <label key={gender} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={gender.toLowerCase()}
                        checked={formData.gender === gender.toLowerCase()}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('gender')}
                        className="mr-2"
                        required
                      />
                      <span className="text-sm">{gender}</span>
                    </label>
                  ))}
                </div>
                {touched.gender && errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>
            </div>
          )}

          {currentScreen === 2 && (
            <div className="space-y-4">
              <FormField
                label="College/School Name"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={errors.college}
                touched={touched.college}
                required
                placeholder="Enter your college name"
              />
              <FormField
                label="Passing Year"
                name="passingYear"
                type="select"
                value={formData.passingYear}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={errors.passingYear}
                touched={touched.passingYear}
                required
              >
                <option value="">Select Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </FormField>
              <FormField
                label="College City"
                name="collegeCity"
                type="select"
                value={formData.collegeCity}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={errors.collegeCity}
                touched={touched.collegeCity}
                required
              >
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </FormField>
            </div>
          )}

          {currentScreen === 3 && (
            <div className="space-y-4">
              <FormField
                label="Bio"
                name="bio"
                type="textarea"
                value={formData.bio}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={errors.bio}
                touched={touched.bio}
                required
                rows={4}
                placeholder="Tell us about yourself (minimum 50 characters)"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills (Optional)
                </label>
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
