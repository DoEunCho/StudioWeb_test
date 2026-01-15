
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Github, Twitter, Send, CheckCircle, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xwvvpqlk', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-8">CONTACT US</h2>
            <p className="text-gray-400 mb-12 text-lg">새로운 프로젝트를 고민 중이신가요?<br />딩스튜디오가 당신의 아이디어를 빛나는 현실로 만들어 드립니다.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600/10 flex items-center justify-center rounded-full text-purple-500">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Email</p>
                  <p className="font-semibold">hello@dingstudio.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600/10 flex items-center justify-center rounded-full text-purple-500">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Phone</p>
                  <p className="font-semibold">02-1234-5678</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600/10 flex items-center justify-center rounded-full text-purple-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Address</p>
                  <p className="font-semibold">서울특별시 강남구 테헤란로 123, 딩빌딩</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              {[Instagram, Github, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-white/5 hover:bg-purple-600 flex items-center justify-center rounded-full transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="relative">
            {status === 'success' ? (
              <div className="bg-white/[0.03] p-8 md:p-12 rounded-3xl border border-purple-500/50 flex flex-col items-center justify-center text-center h-full min-h-[400px] animate-fade-in">
                <CheckCircle className="text-purple-500 mb-6" size={64} />
                <h3 className="text-2xl font-bold mb-4">문의가 성공적으로 전달되었습니다!</h3>
                <p className="text-gray-400 mb-8">빠른 시일 내에 기재해주신 이메일로 답변 드리겠습니다.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-sm font-bold"
                >
                  새로운 문의하기
                </button>
              </div>
            ) : (
              <form 
                className="bg-white/[0.03] p-8 md:p-12 rounded-3xl border border-white/10 transition-all duration-300" 
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-white" 
                      placeholder="성함" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-white" 
                      placeholder="이메일 주소" 
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Subject</label>
                  <select 
                    name="subject"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors appearance-none text-white"
                  >
                    <option value="로고 디자인 문의">로고 디자인 문의</option>
                    <option value="웹사이트 개발 문의">웹사이트 개발 문의</option>
                    <option value="종합 브랜딩 문의">종합 브랜딩 문의</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div className="mb-8">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Message</label>
                  <textarea 
                    name="message"
                    rows={4} 
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-white" 
                    placeholder="프로젝트에 대해 설명해주세요."
                  ></textarea>
                </div>
                
                {status === 'error' && (
                  <div className="mb-6 flex items-center gap-2 text-red-400 text-sm animate-pulse">
                    <AlertCircle size={16} />
                    <span>전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</span>
                  </div>
                )}

                <button 
                  disabled={status === 'submitting'}
                  className={`w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-xl shadow-purple-600/20 flex items-center justify-center gap-2 ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      전송 중...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      메시지 보내기
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
