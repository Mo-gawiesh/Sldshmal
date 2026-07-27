import { NextResponse } from 'next/server';
import * as z from 'zod';

const serviceLabels: Record<string, string> = {
  buy: 'شراء السكراب والمعادن',
  collect: 'جمع ونقل السكراب',
  sort: 'فرز المعادن وتصنيفها',
  recycle: 'إعادة تدوير المعادن',
  industrial: 'التعامل مع المخلفات الصناعية',
  other: 'طلب/استفسار آخر',
};

// Server-side Zod Validation Schema with strict constraints
const contactSchema = z.object({
  name: z
    .string({ required_error: 'الاسم مطلوب' })
    .min(2, { message: 'الاسم يجب أن يحتوي على حرفين على الأقل' })
    .max(100, { message: 'الاسم طويل جداً' }),
  phone: z
    .string({ required_error: 'رقم الجوال مطلوب' })
    .min(7, { message: 'يرجى إدخال رقم جوال صحيح' })
    .max(30, { message: 'رقم الجوال طويل جداً' })
    .refine((val) => {
      const cleanPhone = val.replace(/[\s-]/g, '');
      const hasOnlyPhoneChars = /^\+?[0-9]+$/.test(cleanPhone);
      const digitsOnly = cleanPhone.replace(/\+/g, '');
      return hasOnlyPhoneChars && digitsOnly.length >= 7;
    }, {
      message: 'يرجى إدخال رقم جوال صحيح',
    }),
  email: z
    .string()
    .email({ message: 'الرجاء إدخال بريد إلكتروني صحيح' })
    .max(100, { message: 'البريد الإلكتروني طويل جداً' })
    .optional()
    .or(z.literal('')),
  serviceType: z
    .string({ required_error: 'يرجى تحديد نوع الخدمة المطلوبة' })
    .refine((val) => Object.keys(serviceLabels).includes(val), {
      message: 'نوع الخدمة غير صالح',
    }),
  city: z
    .string()
    .max(50, { message: 'اسم المدينة طويل جداً' })
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .max(1000, { message: 'تفاصيل الطلب طويلة جداً' })
    .optional()
    .or(z.literal('')),
});

// Helper function to sanitize string inputs (HTML escaping to prevent injection/XSS)
function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Parse and Validate using Zod schema
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'بيانات غير صالحة', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;

    // 2. Sanitize inputs to prevent script injection (XSS/HTML injection)
    const sanitizedName = sanitizeString(data.name);
    const sanitizedPhone = sanitizeString(data.phone);
    const sanitizedEmail = data.email ? sanitizeString(data.email) : '';
    const sanitizedCity = data.city ? sanitizeString(data.city) : '';
    const sanitizedMessage = data.message ? sanitizeString(data.message) : '';

    // 3. Construct WhatsApp URL
    const formattedMessage = `السلام عليكم،
أرغب في طلب خدمة من سكراب صلد الشمال.

• الاسم: ${sanitizedName}
• رقم الجوال: ${sanitizedPhone}
• البريد الإلكتروني: ${sanitizedEmail || 'غير محدد'}
• المدينة: ${sanitizedCity || 'غير محدد'}
• نوع الخدمة: ${serviceLabels[data.serviceType] || data.serviceType}
• تفاصيل الطلب:
${sanitizedMessage || 'لا يوجد تفاصيل إضافية'}`;

    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/966543019329?text=${encodedText}`;

    return NextResponse.json({ success: true, whatsappUrl });
  } catch (error) {
    return NextResponse.json(
      { error: 'حدث خطأ في معالجة الطلب على الخادم' },
      { status: 500 }
    );
  }
}
