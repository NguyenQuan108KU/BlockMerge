using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using SonatFramework.Systems;
using SonatFramework.Systems.GameDataManagement;

namespace SonatFramework.Scripts.Helper
{
    public class IntDataPref
    {
        private static readonly Service<DataService> DataService = new();

        private readonly string _name;
        public Action<int> onChanged;

        public IntDataPref(string name)
        {
            _name = name;
        }

        public IntDataPref(string name, int defaultValue)
        {
            if (!DataService.Instance.HasKey(name))
                DataService.Instance.SetInt(name, defaultValue);
            _name = name;
        }

        public int Value
        {
            get => DataService.Instance.GetInt(_name, 0);
            set
            {
                if (value != Value)
                {
                    DataService.Instance.SetInt(_name, value);
                    onChanged?.Invoke(value);
                }
            }
        }

        public bool BoolValue
        {
            get => DataService.Instance.GetInt(_name, 0) != 0;
            set
            {
                if (value == (Value != 0)) return;
                DataService.Instance.SetInt(_name, value ? 1 : 0);
                onChanged?.Invoke(value ? 1 : 0);
            }
        }


        public bool HasKey()
        {
            return DataService.Instance.HasKey(_name);
        }
    }


    public class LongDataPref
    {
        private static readonly Service<DataService> DataService = new();


        private readonly string _name;

        private long _currentValue;
        public Action<long> OnChanged;

        public LongDataPref(string name)
        {
            _name = name;
            _currentValue = 0;
            try
            {
                if (!string.IsNullOrEmpty(DataService.Instance.GetString(_name, "")))
                    _currentValue = long.Parse(DataService.Instance.GetString(_name, ""));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public long Value
        {
            get => _currentValue;
            set
            {
                if (value != Value)
                {
                    _currentValue = value;
                    DataService.Instance.SetString(_name, value.ToString());
                    OnChanged?.Invoke(value);
                }
            }
        }
    }


    public class StringDataPref
    {
        private static readonly Service<DataService> DataService = new();

        private readonly string _name;

        private readonly string _default;

        public StringDataPref(string name, string defaultValue)
        {
            _name = name;
            _default = defaultValue;
        }

        public bool Exist => DataService.Instance.HasKey(_name) &&
                             !string.IsNullOrEmpty(DataService.Instance.GetString(_name, _default));

        public string Value
        {
            get => DataService.Instance.GetString(_name, _default);
            set
            {
                if (value != Value)
                    DataService.Instance.SetString(_name, value);
            }
        }

        public void Clear()
        {
            DataService.Instance.DeleteKey(_name);
        }
    }

    public class ListDataPref<T>
    {
        private static readonly Service<DataService> DataService = new();

        private readonly string _name;
        private List<T> _current;
        public ListDataPref(string name)
        {
            _name = name;
            _current = new List<T>();
            var value = DataService.Instance.GetString(_name, "");
            if (string.IsNullOrEmpty(value))
            {
                _current = new List<T>();
                return;
            }
            else
            {
                var temp = value.Split(',');
                _current = temp.Select(x => (T)Convert.ChangeType(x, typeof(T))).ToList();
            }
        }

        public List<T> Value
        {
            get => _current;
            set
            {
                _current = value;
                var temp = string.Join(",", value.Select(x => x.ToString()));
                if (string.IsNullOrEmpty(temp) == false)
                {
                    DataService.Instance.SetString(_name, temp);
                }
                else{
                    DataService.Instance.DeleteKey(_name);
                }
            }
        }

        public void Add(T idx)
        {
            _current.Add(idx);
            Value = _current;
        }

        public void Remove(T idx)
        {
            _current.Remove(idx);
            Value = _current;
        }

        public void Clear()
        {
            _current = new List<T>();
            Value = _current;
        }

        public bool Contains(T idx)
        {
            return _current.Contains(idx);
        }
    }

    public class ClassDataPref<T> where T : class, new()
    {
        private static readonly Service<DataService> DataService = new();
        private readonly string _name;
        private readonly T _default;
        private T _cache;

        public Action<T> OnChanged;

        public ClassDataPref(string name, T defaultValue = null)
        {
            _name = name;
            _default = defaultValue ?? new T();

            Load();
        }

        public bool Exist =>
            DataService.Instance.HasKey(_name) &&
            !string.IsNullOrEmpty(DataService.Instance.GetString(_name, string.Empty));

        public T Value
        {
            get => _cache;
            set
            {
                if (value == null) value = new T();
                _cache = value;
                Save();
                OnChanged?.Invoke(_cache);
            }
        }

        public void Clear()
        {
            _cache = new T();
            DataService.Instance.DeleteKey(_name);
            OnChanged?.Invoke(_cache);
        }

        public void Save()
        {
            try
            {
                string json = JsonConvert.SerializeObject(_cache);
                DataService.Instance.SetString(_name, json);
            }
            catch (Exception e)
            {
                UnityEngine.Debug.LogError($"Error saving {_name}: {e}");
            }
        }

        private void Load()
        {
            try
            {
                string str = DataService.Instance.GetString(_name, "");
                if (string.IsNullOrEmpty(str))
                {
                    _cache = _default != null ? Clone(_default) : new T();
                    Save();
                }
                else
                {
                    _cache = JsonConvert.DeserializeObject<T>(str);
                }
            }
            catch (Exception e)
            {
                UnityEngine.Debug.LogError($"Error loading {_name}: {e}");
                _cache = new T();
            }
        }

        private T Clone(T source)
        {
            try
            {
                var json = JsonConvert.SerializeObject(source);
                return JsonConvert.DeserializeObject<T>(json);
            }
            catch
            {
                return new T();
            }
        }
    }

}