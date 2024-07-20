import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const resources = {
    en: {
        translation: {
        'home': 'HOME',
        'about': 'INTRODUCTION',
        'news': 'NEWS',
        'activity': 'ACTIVITY',
        'contact': 'CONTACT',
        'vision-mission' : 'Vision - Mission',
        'open letter' : 'Open letter',
        'event' : 'Event',
        'communication, journalism' : 'Communication. Journalism',
        'volunteer' : 'Volunteer Activity',
        'health' : 'Community Health Service',
        'social security' : 'Social Security',
        'sponsor' : 'Sponsorship',
        'contact us' : 'Contact Us',
        'news-event': 'NEWS - EVENT',
        'main activity': 'MAIN ACTIVITY',
        'volunteer activity': 'VOLUNTEER ACTIVITY',
        'social solving': 'SOCIAL SOLVING',
        'Volunteering is a noble form of service, focusing on caring, helping, and sharing with those facing difficulties in life. What is particularly special about volunteering is that it not only brings benefits to the recipients but also greatly enriches the lives of the volunteers themselves.':'Volunteering is a noble form of service, focusing on caring, helping, and sharing with those facing difficulties in life. What is particularly special about volunteering is that it not only brings benefits to the recipients but also greatly enriches the lives of the volunteers themselves.',
        'about us': 'About Us',
        'Social security': 'SOCIAL SECURITY',
        'Reduce social inequality': 'Reduce social inequality',
        'Volunteering activities help reduce social inequality and build a fair and civilized community. By helping those in need, we can create balance and reduce social distance.': 'Volunteering activities help reduce social inequality and build a fair and civilized community. By helping those in need, we can create balance and reduce social distance.',
        'Enhance community unity and cohesion': 'Enhance community unity and cohesion',
        'Volunteering is a community activity, creating a connection point between people. By participating in this activity, people have the opportunity to meet, exchange and cooperate to achieve common goals. This contributes to enhancing community unity and cohesion': 'Volunteering is a community activity, creating a connection point between people. By participating in this activity, people have the opportunity to meet, exchange and cooperate to achieve common goals. This contributes to enhancing community unity and cohesion',
        'Build a spirit of compassion and love': 'Build a spirit of compassion and love',
        'Volunteering activities help spread the spirit of compassion and love in the community. When people participate in this activity together, they experience the joy of helping others': 'Volunteering activities help spread the spirit of compassion and love in the community. When people participate in this activity together, they experience the joy of helping others',
        'library': 'LIBRARY IMAGE',
        'all album': 'All ALBUM',
        'BAO PHONG CHARITY FUND': 'BAO PHONG CHARITY FUND',
        'name': 'Name',
        'phone': 'Phone',
        'email': 'Email',
        'information': 'Information',
        'send': 'Send',

        }
    },
    vi: {
        translation: {
        'home': 'TRANG CHỦ',
        'about': 'GIỚI THIỆU',
        'news': 'TIN TỨC',
        'activity': 'HOẠT ĐỘNG',
        'contact': 'LIÊN HỆ',
        'vision-mission' : 'Tầm nhìn - sứ mệnh',
        'open letter' : 'Thư ngỏ',
        'event' : 'Sự kiện',
        'communication, journalism' : 'Truyền thông, báo chí',
        'volunteer' : 'Hoạt động thiện nguyện',
        'health' : 'Chăm sóc sức khỏe cộng đồng',
        'social security' : 'An sinh xã hội',
        'sponsor' : 'Hoạt động tài trợ',
        'contact us' : 'Liên hệ',
        'news-event': 'TIN TỨC - SỰ KIỆN',
        'main activity': 'CÁC HOẠT ĐỘNG CHÍNH',
        'volunteer activity': 'HOẠT ĐỘNG THIỆN NGUYỆN',
        'social solving': 'GIẢI QUYẾT CÁC VẤN ĐỀ XÃ HỘI',
        'Volunteering is a noble form of service, focusing on caring, helping, and sharing with those facing difficulties in life. What is particularly special about volunteering is that it not only brings benefits to the recipients but also greatly enriches the lives of the volunteers themselves.':'Hoạt động thiện nguyện là một hình thức tình nguyện cao cả, tập trung vào sự quan tâm, giúp đỡ và chia sẻ với những người gặp khó khăn trong cuộc sống. Điều đặc biệt là hoạt động thiện nguyện không chỉ mạng lại lợi ích cho người ',
        'about us': 'VỀ CHÚNG TÔI',
        'Reduce social inequality': 'Giảm bất bình đẳng xã hội',
        'Volunteering activities help reduce social inequality and build a fair and civilized community. By helping those in need, we can create balance and reduce social distance.': 'Hoạt động thiện nguyện giúp giảm bất bình đẳng xã hội và xây dựng một cộng đồng công bằng và văn minh. Bằng cách giúp đỡ những người gặp khó khăn, chúng ta có thể tạo ra sự cân bằng và giảm bớt khoảng cách xã hội.',
        'Enhance community unity and cohesion': 'Tăng cường sự đoàn kết và gắn bó trong cộng đồng',
        'Volunteering is a community activity, creating a connection point between people. By participating in this activity, people have the opportunity to meet, exchange and cooperate to achieve common goals. This contributes to enhancing community unity and cohesion': 'Hoạt động thiện nguyện là một hoạt động cộng đồng, tạo điểm kết nối giữa mọi người. Thông qua việc tham gia vào hoạt động này, mọi người có cơ hội gặp gỡ trao đổi và hợp tác để đạt được mục tiêu chung. Điều này góp phần tăng cường sự đoàn kết và gắn bó cộng đồng',
        'Build a spirit of compassion and love': 'Xây dựng tinh thần nhân ái yêu thương',
        'Volunteering activities help spread the spirit of compassion and love in the community. When people participate in this activity together, they experience the joy of helping others': 'Hoạt động thiện nguyện giúp lan tỏa tinh thần nhân ái và yêu thương trong cộng đòng. khi mọi người cùng nhau thao gia hoạt động này, họ trải nghiệm niềm vui từ việc giúp đỡ người khác',
        'library': 'THƯ VIỆN ẢNH',
        'all album': 'Tất cả ALBUM',
        'BAO PHONG CHARITY FUND': 'QUỸ TỪ THIỆN BẢO PHONG',
        'name': 'Tên',
        'phone': 'Số điện thoại',
        'email': 'Email',
        'information': 'Thông tin cần giúp đỡ',
        'send': 'Gửi',

        



        }
    }
}
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'vi',
        interpolation: {
            escapeValue: false
        }
    });
