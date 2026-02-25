// İstek seçenekleri için tip tanımlaması
interface RequestOptions extends RequestInit {
  timeout?: number; // Özel zaman aşımı süresi
}

export const apiClient = async <T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  // 1. Zaman aşımı kontrolü (Aborting)
  // Belirtilen sürede cevap gelmezse isteği iptal eder, podun CPU'sunu boşa harcamaz.
  const { timeout = 8000, ...fetchOptions } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  // 2. Base URL ve Header yapılandırması
  // Tüm markalar için ortak header'lar burada enjekte edilir.
  const config = {
    ...fetchOptions,
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      'X-Brand-Id': process.env.NEXT_PUBLIC_BRAND_ID || 'base', // Hangi markanın istek attığını belirler
      ...fetchOptions.headers,
    },
  };

  try {
    // 3. Fetch isteğinin başlatılması
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      config,
    );
    clearTimeout(id); // İstek başarılıysa zamanlayıcıyı temizle

    // 4. 429 (Too Many Requests) - Kampanya Anı Yönetimi
    // Sunucu çok yoğunsa kullanıcıyı "Bekleme Odası"na veya bir uyarıya yönlendirebiliriz.
    if (response.status === 429) {
      console.error(
        'Kritik Yük: Sunucu 429 döndürdü. Circuit Breaker devreye girmeli.',
      );
      throw new Error('TOO_MANY_REQUESTS');
    }

    // 5. Genel Hata Yönetimi
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'API_ERROR');
    }

    // 6. Başarılı Sonuç
    return response.json();
  } catch (error: any) {
    // Zaman aşımı hatasını özel yakalayalım
    if (error.name === 'AbortError') {
      throw new Error('REQUEST_TIMEOUT');
    }
    throw error;
  }
};
