import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const template_id = body.get('template_id');
    const texts = body.getAll('texts') as string[];

    if (!template_id) {
      return NextResponse.json({ success: false, error_message: 'Missing template_id' }, { status: 400 });
    }

    const username = 'abuzar232';
    const password = '123abuzar1234';

    const formData = new FormData();
    formData.append('template_id', template_id as string);
    formData.append('username', username);
    formData.append('password', password);

    // Add boxes[i][text] for each text
    texts.forEach((text, index) => {
      formData.append(`boxes[${index}][text]`, text);
    });

    const response = await fetch('https://api.imgflip.com/caption_image', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error_message: 'Internal Server Error' }, { status: 500 });
  }
}
