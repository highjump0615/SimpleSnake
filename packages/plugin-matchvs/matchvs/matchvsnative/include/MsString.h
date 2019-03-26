#ifndef __MS_STRING_H__
#define __MS_STRING_H__

#ifdef __cplusplus
#include <string>
#endif

#include <string.h>
#include <stdlib.h>
#include <assert.h>

#if (defined(WIN32) || defined(_WIN32) || defined(__WIN32__) || defined(__NT__))
#define DLL_API __declspec(dllexport)
#else
#define DLL_API __attribute__((visibility("default")))
#endif

namespace matchvs
{
    enum { _ALIGN = 8 };

    class DLL_API MsString
    {
	public:
        MsString(void);
        MsString(const int pre);
        MsString(const char* str);
        MsString(const char* str, int size);
        MsString(const MsString& obj);
		
#ifdef __cplusplus
        MsString(const std::string &str);

        MsString& operator=(std::string& str);

        MsString& operator+=(const std::string& obj);
#endif

        virtual ~MsString(void);

        MsString& operator=(const MsString& obj);
        MsString& operator=(const char *rhs);
        MsString& operator+=(const char *rhs);
        MsString& operator+=(const char rhs);
        MsString& operator+=(const MsString& obj);

        bool operator==(const MsString& rhs) const;
        bool operator!=(const MsString& rhs) const;
        bool  operator<(const MsString& rhs) const;
        bool operator<=(const MsString& rhs) const;
        bool operator>(const MsString& rhs) const;
        bool operator>=(const MsString& rhs) const;
        char& operator [](const size_t index);
        const char& operator [](const size_t index) const;

        const char* data() const;
        const char* c_str() const;
        bool empty() const;
        int length() const;
        int size() const;
        int capacity() const;
        void clear();
        void resize(int size);

        MsString substr(size_t pos, size_t n) const;

        MsString& append(const MsString& obj);
        MsString& append(const char* str, int size);
        MsString& append(const char chr);
        MsString& assign(const void* data, int size);
        MsString& assign(const char* str);
        MsString& assign(const MsString& rhs);

        friend MsString operator+(const MsString &lhs, const MsString& rhs)
        {
            MsString ret = lhs;
            ret += rhs;
            return ret;
        }

	private:
        static int ROUND_UP(int bytes);
	
	public:
        char*		  m_ptr;
        int           m_length;
        int			  m_capacity;
    };
}

#endif