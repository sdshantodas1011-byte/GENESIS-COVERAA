export interface BatchStudent {
  regNo: string;
  name: string;
}

export interface SemesterCourse {
  code: string;
  title: string;
}

export interface FacultyMember {
  name: string;
  designation: string;
}

export const GEB_STUDENTS: BatchStudent[] = [
  {regNo: '202551211006', name: 'Prapti Rani Biswas'},
  {regNo: '202551211009', name: 'Mohammad Rajabul Islam Shapneel'},
  {regNo: '202551211013', name: 'Jihad Hasan'},
  {regNo: '202551211015', name: 'Md. Naeem Ahmed'},
  {regNo: '202551211016', name: 'Abeer Anzum'},
  {regNo: '202551211018', name: 'Md. Akhiruzzaman Bosunia'},
  {regNo: '202551211020', name: 'Md. Azharul Islam'},
  {regNo: '202551211021', name: 'Kazi Shamsul Alam'},
  {regNo: '202551211022', name: 'Dhrupadi Talukder'},
  {regNo: '202551211026', name: 'Ashis Das'},
  {regNo: '202551211027', name: 'Md. Shihab Hossain'},
  {regNo: '202551211029', name: 'Promit Gop Ratul'},
  {regNo: '202551211030', name: 'Rehnuma Tabassum Progga'},
  {regNo: '202551211031', name: 'Irfan Ahmed Joy'},
  {regNo: '202551211038', name: 'Md Nur Shafi'},
  {regNo: '202551211039', name: 'Anan Islam'},
  {regNo: '202551211042', name: 'Md. Tanvir Ahmed'},
  {regNo: '202551211043', name: 'Rudro Proshad Chowdhury'},
  {regNo: '202551211044', name: 'Fawzia Maliha Tiyaba'},
  {regNo: '202551211045', name: 'Shahriar Sifat Rahman Khan'},
  {regNo: '202551211046', name: 'Choity Rani Paul'},
  {regNo: '202551211047', name: 'Jeba Tahsin'},
  {regNo: '202551211048', name: 'Md. Sorwar Jahan'},
  {regNo: '202551211049', name: 'Mohammad Nehal Alam'},
  {regNo: '202551211050', name: 'Nousheen Tarannum Choudhury'},
  {regNo: '202551211051', name: 'Shanto Das'},
  {regNo: '202551211052', name: 'Sreeya Almik Tonu'},
  {regNo: '202551211054', name: 'Prapa Bhuiyan'},
  {regNo: '202551211055', name: 'Ankur Roy'},
  {regNo: '202551211056', name: 'Md. Golam Kibria'},
  {regNo: '2024431046', name: 'Biswajit Panday'},
  {regNo: '2023431043', name: 'Jannatul Ferdaous'},
];

export const GEB_COURSES: SemesterCourse[] = [
  {code: 'GEB 0512 1231', title: 'Basic Biochemistry'},
  {code: 'GEB 0512 1232', title: 'Basic Biochemistry Lab'},
  {code: 'GEB 0512 1233', title: 'Cytology'},
  {code: 'GEB 0512 1234', title: 'Cytology Lab'},
  {code: 'GEB 0512 1235', title: 'Principles of Genetics'},
  {code: 'CSE 0613 1206J', title: 'Python Programming Lab'},
  {code: 'ENG 0231 1201J', title: 'Effective Communication in English'},
  {code: 'ENG 0231 1202J', title: 'English Language Lab'},
  {code: 'SCW 0417 1201J', title: 'Industrial Relations and Human Resource Management'},
  {code: 'GEB 0512 1250', title: 'Viva Voce'},
];

export const GEB_TEACHERS: FacultyMember[] = [
  {name: 'Dr Md Abul Kalam Azad', designation: 'Professor'},
  {name: 'Md Shamsul Haque Prodhan, PhD', designation: 'Professor'},
  {name: 'Dr S M Abu Sayem', designation: 'Professor'},
  {name: 'Dr Md Kamrul Islam', designation: 'Professor'},
  {name: 'Dr. Md. Abdullah Al Mamun', designation: 'Professor & Head'},
  {name: 'Dr. Md. Faruque Miah', designation: 'Professor'},
  {name: 'Dr Mohammad Jakir Hosen', designation: 'Professor'},
  {name: 'Dr. Md Jahangir Alam', designation: 'Professor'},
  {name: 'Dr. Mohammad Zahangir Alam', designation: 'Professor'},
  {name: 'Asif Iqbal, Ph.D.', designation: 'Professor'},
  {name: 'Md Asraful Jahan, PhD', designation: 'Professor'},
  {name: 'Md Shakhinur Islam Mondal, PhD', designation: 'Professor'},
  {name: 'Dr. Md Ashrafuzzaman', designation: 'Professor'},
  {name: 'Anindita Chakraborty, PhD', designation: 'Professor'},
  {name: 'Dr. Gokul Chandra Biswas', designation: 'Professor'},
  {name: 'Md Jahangir Alam, PhD', designation: 'Professor'},
  {name: 'Zobada Kanak Khan', designation: 'Associate Professor'},
  {name: 'Dr. Md Javed FOYSAL', designation: 'Associate Professor'},
  {name: 'Md Hazrat Ali', designation: 'Associate Professor'},
  {name: 'Ziaul Faruque Joy', designation: 'Associate Professor'},
  {name: 'Md Toasin Hossain Aunkor', designation: 'Assistant Professor'},
  {name: 'Asif Mahmud', designation: 'Assistant Professor'},
  {name: 'G. M. Nurnabi Azad Jewel', designation: 'Assistant Professor'},
  {name: 'Musammat Kulsuma Begum', designation: 'Lecturer'},
];

export const GROUP_OPTIONS: {value: string; label: string; hint: string}[] = [
  {value: 'No', label: 'No', hint: 'Individual'},
  {value: '1', label: '1', hint: 'Group 1'},
  {value: '2', label: '2', hint: 'Group 2'},
  {value: '3', label: '3', hint: 'Group 3'},
  {value: '4', label: '4', hint: 'Group 4'},
  {value: '5', label: '5', hint: 'Group 5'},
  {value: '6', label: '6', hint: 'Group 6'},
  {value: '7', label: '7', hint: 'Group 7'},
  {value: '8', label: '8', hint: 'Group 8'},
  {value: '9', label: '9', hint: 'Group 9'},
  {value: '10', label: '10', hint: 'Group 10'},
];

export const EXPERIMENT_NUMBERS: string[] = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];
