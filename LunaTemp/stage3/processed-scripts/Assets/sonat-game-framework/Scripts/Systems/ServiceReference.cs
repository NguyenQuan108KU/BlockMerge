using System;
using Sirenix.OdinInspector;

namespace SonatFramework.Systems
{
    [Serializable]
    public class Service<T> where T : class
    {
        [EnumToggleButtons] public ReferenceType referenceType = ReferenceType.Automatic;

        //[ShowIf("@referenceType == ReferenceType.Manual")]
        public T reference;

        private static T instance;
        public T Instance
        {
            get
            {
                if (referenceType == ReferenceType.Manual)
                    return reference;

                if (instance == null)
                    instance = SonatSystem.GetService<T>();

                return instance;
            }
        }

        public static T Get()
        {
            if (instance == null)
                instance = SonatSystem.GetService<T>();

            return instance;
        }

        public Service()
        {
            
        }

        public Service(ReferenceType referenceType)
        {
            this.referenceType = referenceType;
        }
    }

    public enum ReferenceType
    {
        Manual,
        Automatic
    }
}